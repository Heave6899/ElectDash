using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using AutoMapper;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebApi.Entities.Machine
{
    public class MachineData
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public decimal Current { get; set; }
        public decimal Voltage { get; set; }
        public decimal Power { get; set; }
        public int Frequency { get; set; }
        public decimal PF { get; set; }
        public DateTime CreatedOn { get; set; }
        public string MachineName { get; set; }
        public int PhaseNo { get; set; }
    }

    public class MachineDataDTO
    {
        public decimal Current { get; set; }
        public decimal Voltage { get; set; }
        public decimal Power { get; set; }
        public int Frequency { get; set; }
        public decimal PF { get; set; }
        public DateTime CreatedOn { get; set; }
        public string MachineName { get; set; }
        public int PhaseNo { get; set; }
    }

    public class MachineDataTableDTO
    {
        public decimal Current1 { get; set; }
        public decimal Current2 { get; set; }
        public decimal Current3 { get; set; }
        public decimal Voltage1 { get; set; }
        public decimal Voltage2 { get; set; }
        public decimal Voltage3 { get; set; }
        public decimal Power1 { get; set; }
        public decimal Power2 { get; set; }
        public decimal Power3 { get; set; }
        public DateTime CreatedOn { get; set; }
    }

    public class MachineDataPost
    {
        public decimal Current { get; set; }
        public decimal Voltage { get; set; }
        public decimal Power { get; set; }
        public string MachineName { get; set; }
        public int PhaseNo { get; set; }
    }

    public class MachineGraphDTO
    {
        public List<MachineDataDTO> PhaseOne { get; set; }
        public List<MachineDataDTO> PhaseTwo { get; set; }
        public List<MachineDataDTO> PhaseThree { get; set; }
        public int Count { get; set; }
        public MachineGraphDTO()
        {
            PhaseOne = new List<MachineDataDTO>();
            PhaseTwo = new List<MachineDataDTO>();
            PhaseThree = new List<MachineDataDTO>();
        }
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