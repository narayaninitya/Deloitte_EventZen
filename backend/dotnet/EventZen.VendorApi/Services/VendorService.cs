using System.Collections.Generic;
using EventZen.VendorApi.Data;
using EventZen.VendorApi.Models;
using MongoDB.Driver;
using MongoDB.Bson;

namespace EventZen.VendorApi.Services;

public class VendorService
{
    private readonly IMongoCollection<Vendor> _vendors;

    public VendorService(MongoDbContext dbContext)
    {
        _vendors = dbContext.Vendors;
    }

    public List<Vendor> GetAllVendors()
    {
        return _vendors.Find(_ => true).ToList();
    }

    public List<Vendor> GetVendorsByEventId(string eventId)
    {
        return _vendors.Find(v => v.EventId == eventId).ToList();
    }

    public Vendor CreateVendor(Vendor vendor)
    {
        _vendors.InsertOne(vendor);
        return vendor;
    }

    public Vendor? UpdateVendor(string id, Vendor updatedVendor)
{
    if (!ObjectId.TryParse(id, out var objectId))
    {
        throw new ArgumentException("Invalid ID format.");
    }

    var existingVendor = _vendors.Find(v => v.Id == objectId).FirstOrDefault();
    if (existingVendor != null)
    {
        updatedVendor.Id = objectId; // Ensure the ID remains consistent
        _vendors.ReplaceOne(v => v.Id == objectId, updatedVendor);
    }

    return existingVendor;
}

    public void DeleteVendor(string id)
{
    if (!ObjectId.TryParse(id, out var objectId))
    {
        throw new ArgumentException("Invalid ID format.");
    }

    _vendors.DeleteOne(v => v.Id == objectId);
}

    public Vendor? GetVendorById(string id)
{
    if (!ObjectId.TryParse(id, out var objectId))
    {
        throw new ArgumentException("Invalid ID format.");
    }

    return _vendors.Find(v => v.Id == objectId).FirstOrDefault();
}
}