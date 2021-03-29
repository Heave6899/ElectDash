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
    [Route("mfa")]
    public class MFAController : ControllerBase
    {
        private IMFAService _mfaService;
        public MFAController(IMFAService mfaService)
        {
            _mfaService = mfaService;
        }

        [HttpGet("generate")]
        [Authorize]
        public IActionResult GetSecret()
        {
            var secret = _mfaService.GenerateMFA();
            return Ok(new {data = secret});
        }
    }
}