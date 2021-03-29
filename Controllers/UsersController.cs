using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Services;
using System.Threading.Tasks;
using WebApi.Entities.MFA;
using WebApi.Entities.User;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("users")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private IMFAService _mfaService;
        public UsersController(IUserService userService, IMFAService mfaService)
        {
            _userService = userService;
            _mfaService = mfaService;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate(AuthenticateRequest model)
        {
            var response = await _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            else if (response.GetType().ToString() == "System.String")
            {
                return Ok(new { message = "MfaEnabled" });
            }
            else
            {
                return Ok(response);
            }
        }

        [HttpPost("authenticate/mfa")]
        public async Task<IActionResult> VerifyOtp(AuthenticateRequest request)
        {
            //var userId = HttpContext.User.Claims.First(x => x.Type == "id").Value;
            var response = await _userService.Authenticate(request, true);
            if (response.GetType().ToString() != "System.String")
            {
                return Ok(response);
            }
            else
            {
                return Conflict();
            }
        }

        [HttpPost("activate/mfa")]
        [Authorize]
        public async Task<IActionResult> ActivateDeactivateMFA(MFAPostRequest request)
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "Sub").Value;
            var user = await _userService.GetById(userId);
            if (user.IsMFAEnabled == true)
            {
                request.MFASecret = user.MFASecret;
            }
            var response = _mfaService.VerifyMFACode(request);
            if (response == true)
            {
                await _userService.ActivateDeactivateMFA(userId, request.MFASecret, request.ActDeact);
                return Ok(response);
            }
            else
            {
                return Conflict();
            }
        }

        [Authorize]
        [HttpGet("ismfaenabled")]
        public async Task<IActionResult> CheckMFAEnabled()
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "Sub").Value;
            var result = await _userService.CheckMFAEnabled(userId);
            return Ok(new { result = result });
        }

        // [Authorize]
        // [HttpGet]
        // public async Task<IActionResult> GetAll()
        // {
        //     var users = await _userService.GetAllAsync();
        //     return Ok(users);
        // }

        [Authorize]
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterUser userPostRequest)
        {
            var user = await _userService.CreateAsync(userPostRequest);
            return Ok(user);
        }
    }
}
