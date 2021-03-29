using System.Text.Json.Serialization;
using AutoMapper;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebApi.Entities.User
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        [JsonIgnore]
        public string MFASecret { get; set; }
        public bool IsMFAEnabled { get; set; }
    }
    public class UserDTO
    {
        public string Id { get; set; }
        public string Username { get; set; }
    }
    public class RegisterUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
    
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<RegisterUser, User>();
            CreateMap<User, UserDTO>();
        }
    }
}