using AutoMapper;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebApi.Entities.User;
using WebApi.Entities.MFA;
using WebApi.Helpers;
using WebApi.Models;

namespace WebApi.Services
{
    public interface IUserService
    {
        Task<List<User>> Get();
        Task<User> Get(string id);
        Task<User> CreateAsync(RegisterUser User);
        void Update(string id, User UserIn);
        void Remove(User UserIn);
        Task<dynamic> Authenticate(AuthenticateRequest model, bool IsMFARequest = false);
        Task<List<User>> GetAllAsync();
        Task<User> GetById(string id);
        Task<bool> ActivateDeactivateMFA(string id, string MFA, bool ActDeact);
        Task<bool> CheckMFAEnabled(string Id);
    }

    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private readonly IMongoCollection<User> _users;
        private readonly IMapper _mapper;
        private readonly IMFAService _mfaService;
        public UserService(IDbContext context, IOptions<AppSettings> appSettings, IMapper mapper, IMFAService mfaService)
        {
            _appSettings = appSettings.Value;
            _mapper = mapper;
            _mfaService = mfaService;
            var client = new MongoClient(context.ConnectionString);
            var database = client.GetDatabase(context.DatabaseName);

            _users = database.GetCollection<User>(context.UserCollectionName);
        }
        public async Task<List<User>> Get() =>
            await _users.Find(User => true).ToListAsync();

        public async Task<User> Get(string id) =>
            await _users.Find<User>(User => User.Id == id).FirstOrDefaultAsync();

        public async Task<User> CreateAsync(RegisterUser User)
        {
            var user = _mapper.Map<User>(User);
            await _users.InsertOneAsync(user);
            return user;
        }

        public void Update(string id, User UserIn) =>
            _users.ReplaceOneAsync(User => User.Id == id, UserIn);

        public void Remove(User UserIn) =>
            _users.DeleteOneAsync(User => User.Id == UserIn.Id);

        public void Remove(string id) =>
            _users.DeleteOneAsync(User => User.Id == id);

        public async Task<dynamic> Authenticate(AuthenticateRequest model, bool IsMFARequest = false)
        {
            var user = await _users.Find<User>(x => x.Username == model.Username && x.Password == model.Password).FirstOrDefaultAsync();

            // return null if user not found
            if (user == null) return null;

            if (user.IsMFAEnabled == true && IsMFARequest == false)
            {
                return "MfaEnabled";
            }
            else if (user.IsMFAEnabled == true && IsMFARequest == true)
            {
                var mfaRequest = new MFAPostRequest();
                mfaRequest.MFACode = model.MFA;
                mfaRequest.MFASecret = user.MFASecret;
                var response = _mfaService.VerifyMFACode(mfaRequest);
                if (response == false)
                {
                    return "error";
                }
                else
                {
                    var token = generateJwtToken(user);
                    return new AuthenticateResponse(user, token);
                }
            }
            else
            {
                var token = generateJwtToken(user);
                return new AuthenticateResponse(user, token);
            }
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _users.Find(s => true).ToListAsync();
        }

        public async Task<User> GetById(string id)
        {
            return await _users.Find<User>(x => x.Id == id).FirstOrDefaultAsync();
        }
        public async Task<bool> ActivateDeactivateMFA(string id, string MFA, bool ActDeact)
        {
            var filter = Builders<User>.Filter.Eq("Id", id);
            if (ActDeact == false)
            {
                var update = Builders<User>.Update.Set("MFASecret", MFA).Set("IsMFAEnabled", true);
                await _users.UpdateOneAsync(filter, update);
                return true;
            }
            else
            {
                var update = Builders<User>.Update.Set("MFASecret", "").Set("IsMFAEnabled", false);
                await _users.UpdateOneAsync(filter, update);
                return true;
            }

        }

        public async Task<bool> CheckMFAEnabled(string Id)
        {
            var obj = await _users.Find<User>(x => x.Id == Id).FirstOrDefaultAsync();
            if (obj != null && obj.IsMFAEnabled == true)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        // helper methods

        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Secret));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[] {
            new Claim("Sub", user.Id),
            new Claim("IsMFAEnabled", user.IsMFAEnabled.ToString()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var token = new JwtSecurityToken(
              issuer: _appSettings.Issuer,
              audience: _appSettings.Issuer,
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}