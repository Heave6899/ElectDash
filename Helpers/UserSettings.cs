namespace WebApi.Helpers
{
    public class DbContext : IDbContext
    {
        public string DatabaseName { get; set; }
        public string ConnectionString { get; set; }
        public string UserCollectionName { get; set; }
        public string MachineCollectionName { get; set; }
    }
    public interface IDbContext
    {
        public string DatabaseName { get; set; }
        public string ConnectionString { get; set; }
        public string UserCollectionName { get; set; }
        public string MachineCollectionName { get; set; }
    }
}