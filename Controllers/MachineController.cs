using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Services;
using System.Threading.Tasks;
using WebApi.Entities;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Text;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("machine")]
    public class MachineController : ControllerBase
    {
        private IMachineService _machineService;
        public MachineController(IMachineService machineService)
        {
            _machineService = machineService;
        }

        [HttpGet("graph/{machinename}")]
        [Authorize]
        public async Task<IActionResult> GetMachineDataGraph(string machinename)
        {
            var data = await _machineService.GetMachineData(machinename);
            return Ok(data);
        }

        [HttpGet("{q}")]
        [Authorize]
        public async Task<IActionResult> GetMachineDataTable(string q)
        {
            var bytes = Convert.FromBase64String(q);
            var decodedString = Encoding.UTF8.GetString(bytes);
            var obj = JsonConvert.DeserializeObject<Dictionary<string, string>>(decodedString);
            var data = await _machineService.GetMachineDataTable(obj["machinename"], int.Parse(obj["skip"]), int.Parse(obj["limit"]));
            return Ok(data);
        }

        // [HttpGet("a/{machinename}")]
        // [Authorize]
        // public async Task<IActionResult> GetMachineDataTotalKwh(string machinename)
        // {
        //     var data = await _machineService.GetMachineDataTable(machinename);
        //     return Ok(data);
        // }
    }
}