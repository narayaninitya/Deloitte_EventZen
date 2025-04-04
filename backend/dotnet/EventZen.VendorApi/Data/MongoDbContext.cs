using MongoDB.Driver;
using EventZen.VendorApi.Models;

namespace EventZen.VendorApi.Data;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(IConfiguration configuration)
    {
        var connectionString = configuration["MongoDb:ConnectionString"];
        var databaseName = configuration["MongoDb:DatabaseName"];

        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);
    }

    public IMongoCollection<Vendor> Vendors => _database.GetCollection<Vendor>("vendors");
    public IMongoCollection<Venue> Venues => _database.GetCollection<Venue>("venues");
}