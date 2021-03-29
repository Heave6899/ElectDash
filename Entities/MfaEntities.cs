using System.Text.Json.Serialization;
using AutoMapper;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebApi.Entities.MFA
{
    public class MFAPostRequest
    {
        // Activate 0
        // Deactivate 1
        public string MFASecret { get; set; }
        public string MFACode { get; set; }
        public bool ActDeact { get; set; }
    }
}