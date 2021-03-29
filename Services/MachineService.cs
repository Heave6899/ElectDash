using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Mqtt.Client.AspNetCore.Services;
using WebApi.Entities.Machine;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface IMachineService
    {
        Task<MachineData> MachineReceiveData(string data);
    }
    public class MachineService : IMachineService
    {
        private readonly AppSettings _appSettings;
        private readonly IMongoCollection<MachineData> _machines;
        private readonly IMapper _mapper;
        public MachineService(IDbContext context, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            _appSettings = appSettings.Value;
            _mapper = mapper;
            var client = new MongoClient(context.ConnectionString);
            var database = client.GetDatabase(context.DatabaseName);
            _machines = database.GetCollection<MachineData>(context.MachineCollectionName);
        }
        public async Task<MachineData> MachineReceiveData(string data)
        {
            Console.WriteLine("received");
            var machinedata = _mapper.Map<MachineData>(Newtonsoft.Json.JsonConvert.DeserializeObject<MachineDataPost>(data));
            machinedata.CreatedOn = DateTime.Now;
            await _machines.InsertOneAsync(machinedata);
            return machinedata;
        }
    }
}