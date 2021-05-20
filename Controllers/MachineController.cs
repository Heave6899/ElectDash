using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Services;
using System.Threading.Tasks;
using WebApi.Entities;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

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

        [HttpGet("{machinename}")]
        [Authorize]
        public async Task<IActionResult> GetMachineDataTable(string machinename)
        {
            var data = await _machineService.GetMachineDataTable(machinename);
            return Ok(data);
        }
    }
}