using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Mqtt.Client.AspNetCore.Services;
using WebApi.Entities.Machine;
using WebApi.Helpers;
using System.Linq;
using System.Collections.Generic;

namespace WebApi.Services
{
    public interface IMachineService
    {
        Task<MachineData> MachineReceiveData(string data);
        Task<MachineGraphDTO> GetMachineData(string MachineName);
        Task<List<MachineDataTableDTO>> GetMachineDataTable(string MachineName, int Skip, int Limit);
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
            machinedata.CreatedOn = DateTime.UtcNow;
            await _machines.InsertOneAsync(machinedata);
            return machinedata;
        }

        public async Task<MachineGraphDTO> GetMachineData(string MachineName)
        {
            var data = new MachineGraphDTO();
            data.PhaseOne = _mapper.Map<List<MachineDataDTO>>(await _machines.Find<MachineData>(x => x.MachineName == MachineName && x.PhaseNo == 1).SortByDescending(x => x.CreatedOn).Limit(40).ToListAsync());
            data.PhaseTwo = _mapper.Map<List<MachineDataDTO>>(await _machines.Find<MachineData>(x => x.MachineName == MachineName && x.PhaseNo == 2).SortByDescending(x => x.CreatedOn).Limit(40).ToListAsync());
            data.PhaseThree = _mapper.Map<List<MachineDataDTO>>(await _machines.Find<MachineData>(x => x.MachineName == MachineName && x.PhaseNo == 3).SortByDescending(x => x.CreatedOn).Limit(40).ToListAsync());
            data.Count = data.PhaseOne.Count;
            return data;
        }
        public async Task<List<MachineDataTableDTO>> GetMachineDataTable(string MachineName, int Skip, int Limit)
        {
            var data = new List<MachineDataTableDTO>();
            Skip = Limit * Skip;
            var PhaseOne = _mapper.Map<List<MachineDataDTO>>(await _machines.Find<MachineData>(x => x.MachineName == MachineName && x.PhaseNo == 1).SortByDescending(x => x.CreatedOn).Skip(Skip).Limit(Limit).ToListAsync());
            var PhaseTwo = _mapper.Map<List<MachineDataDTO>>(await _machines.Find<MachineData>(x => x.MachineName == MachineName && x.PhaseNo == 2).SortByDescending(x => x.CreatedOn).Skip(Skip).Limit(Limit).ToListAsync());
            var PhaseThree = _mapper.Map<List<MachineDataDTO>>(await _machines.Find<MachineData>(x => x.MachineName == MachineName && x.PhaseNo == 3).SortByDescending(x => x.CreatedOn).Skip(Skip).Limit(Limit).ToListAsync());
            if (PhaseOne.Count != 0 && PhaseTwo.Count != 0 && PhaseThree.Count != 0)
            {
                for (var i = 0; i < PhaseOne.Count; i++)
                {
                    data.Add(new MachineDataTableDTO()
                    {
                        CreatedOn = PhaseOne[i].CreatedOn,
                        Voltage1 = PhaseOne[i].Voltage,
                        Voltage2 = PhaseTwo[i].Voltage,
                        Voltage3 = PhaseThree[i].Voltage,
                        Current1 = PhaseOne[i].Current,
                        Current2 = PhaseTwo[i].Current,
                        Current3 = PhaseThree[i].Current,
                        Power1 = PhaseOne[i].Power,
                        Power2 = PhaseTwo[i].Power,
                        Power3 = PhaseThree[i].Power
                    });
                }
            }


            return data;
        }
    }
}