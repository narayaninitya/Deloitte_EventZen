using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EventZen.VendorApi.Models;

public class Vendor
{
    public ObjectId Id { get; set; } // Use ObjectId

    [BsonElement("eventId")] // Maps to the "eventId" field in MongoDB
    public string? EventId { get; set; }

    [BsonElement("vendorName")] // Maps to the "vendorName" field in MongoDB
    public string? VendorName { get; set; }

    [BsonElement("contactInfo")] // Maps to the "contactInfo" field in MongoDB
    public string? ContactInfo { get; set; }

    [BsonElement("services")] // Maps to the "services" field in MongoDB
    public string? Services { get; set; }

    [BsonElement("_class")] // Maps to the "class" field in MongoDB
    public string? Class { get; set; }
}


