using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EventZen.VendorApi.Models;

public class Venue
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)] // Ensures _id is treated as ObjectId but can be serialized/deserialized as a string
    public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

    [BsonElement("eventId")]
    public string? EventId { get; set; }

    [BsonElement("venueName")]
    public string? VenueName { get; set; }

    [BsonElement("capacity")]
    public int Capacity { get; set; }

    [BsonElement("amenities")]
    public string? Amenities { get; set; }

    [BsonElement("address")]
    public string? Address { get; set; }

    [BsonElement("pricing")]
    public decimal Pricing { get; set; }

    [BsonElement("_class")] // Maps to the "class" field in MongoDB
    public string? Class { get; set; }
}