using System.Collections.Generic;
using MongoDB.Bson;
using EventZen.VendorApi.Data;
using EventZen.VendorApi.Models;
using MongoDB.Driver;

namespace EventZen.VendorApi.Services;

public class VenueService
{
    private readonly IMongoCollection<Venue> _venues;

    public VenueService(MongoDbContext dbContext)
    {
        _venues = dbContext.Venues;
    }

    public List<Venue> GetAllVenues()
    {
        return _venues.Find(_ => true).ToList();
    }

    public Venue? GetVenueById(string id)
    {
        if (!ObjectId.TryParse(id, out var objectId))
        {
            throw new ArgumentException("Invalid ID format.");
        }

        return _venues.Find(v => v.Id == objectId.ToString()).FirstOrDefault();
    }

    public List<Venue> GetVenuesByEventId(string eventId)
    {
        return _venues.Find(v => v.EventId == eventId).ToList();
    }

    public Venue CreateVenue(Venue venue)
    {
        venue.Id = ObjectId.GenerateNewId().ToString(); // Generate a new ObjectId as a string
        _venues.InsertOne(venue);
        return venue;
    }

    public Venue? UpdateVenue(string id, Venue updatedVenue)
    {
        if (!ObjectId.TryParse(id, out var objectId))
        {
            throw new ArgumentException("Invalid ID format.");
        }

        var existingVenue = _venues.Find(v => v.Id == objectId.ToString()).FirstOrDefault();
        if (existingVenue != null)
        {
            updatedVenue.Id = objectId.ToString(); // Ensure the ID remains consistent
            _venues.ReplaceOne(v => v.Id == objectId.ToString(), updatedVenue);
        }

        return existingVenue;
    }

    public void DeleteVenue(string id)
    {
        if (!ObjectId.TryParse(id, out var objectId))
        {
            throw new ArgumentException("Invalid ID format.");
        }

        _venues.DeleteOne(v => v.Id == objectId.ToString());
    }
}