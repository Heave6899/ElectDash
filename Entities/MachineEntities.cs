using System;
using System.Text.Json.Serialization;
using AutoMapper;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebApi.Entities.User
{
    public class MachineData
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public decimal Current { get; set; }
        public decimal Voltage { get; set; }
        public decimal Power { get; set; }
        public DateTime CreatedOn { get; set; }
        public string MachineName { get; set; }
    }

    public class MachineDataDTO
    {
        public decimal Current { get; set; }
        public decimal Voltage { get; set; }
        public decimal Power { get; set; }
        public DateTime CreatedOn { get; set; }
        public string MachineName { get; set; }
    }

    public class MachineDataPost
    {
        public decimal Current { get; set; }
        public decimal Voltage { get; set; }
        public decimal Power { get; set; }
        public DateTime CreatedOn { get; set; }
        public string MachineName { get; set; }
    }

    public class MachineProfile : Profile
    {
        public MachineProfile()
        {
            CreateMap<MachineData, MachineDataDTO>();
            CreateMap<MachineDataPost, MachineData>();
        }
    }
}