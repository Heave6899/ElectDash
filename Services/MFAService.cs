using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OtpNet;
using WebApi.Entities.MFA;

namespace WebApi.Services
{
    public interface IMFAService
    {
        string GenerateMFA();
        bool VerifyMFACode(MFAPostRequest request, string id = null);    
    }
    public class MFAService : IMFAService
    {
        private static Random random = new Random();
        public MFAService()
        {
        }
        public string GenerateMFA()
        {
            var key = KeyGeneration.GenerateRandomKey(20);
            var secretKey = Base32Encoding.ToString(key);
            return "otpauth://totp/Admin@ElectDash?secret=" + secretKey + "&issuer=Vantinum.Tech&algorithm=SHA1&digits=6&period=30";
        }
        public bool VerifyMFACode(MFAPostRequest request, string id = null)
        {
            var secret = Base32Encoding.ToBytes(request.MFASecret);
            var totp = new Totp(secret);
            var window = new VerificationWindow(previous: 1, future: 1);
            var result = totp.VerifyTotp(request.MFACode, out long timeWindowUsed, window);
            var totpCode = totp.ComputeTotp();
            return result;
        }
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}