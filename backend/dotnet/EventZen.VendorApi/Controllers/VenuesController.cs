using Microsoft.AspNetCore.Mvc;
using EventZen.VendorApi.Models;
using EventZen.VendorApi.Services;

namespace EventZen.VendorApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VenuesController : ControllerBase
{
    private readonly VenueService _venueService;

    public VenuesController(VenueService venueService)
    {
        _venueService = venueService;
    }

    [HttpGet]
    public ActionResult<List<Venue>> GetAllVenues()
    {
        return Ok(_venueService.GetAllVenues());
    }

    [HttpGet("{id}")]
    public ActionResult<Venue> GetVenueById(string id)
    {
        var venue = _venueService.GetVenueById(id);
        return venue != null ? Ok(venue) : NotFound();
    }

    [HttpGet("event/{eventId}")]
    public ActionResult<List<Venue>> GetVenuesByEventId(string eventId)
    {
        return Ok(_venueService.GetVenuesByEventId(eventId));
    }

    [HttpPost]
    public ActionResult<Venue> CreateVenue([FromBody] Venue venue)
    {
        var createdVenue = _venueService.CreateVenue(venue);
        return CreatedAtAction(nameof(GetVenueById), new { id = createdVenue.Id }, createdVenue);
    }

    [HttpPut("{id}")]
    public ActionResult<Venue> UpdateVenue(string id, [FromBody] Venue updatedVenue)
    {
        var venue = _venueService.UpdateVenue(id, updatedVenue);
        return venue != null ? Ok(venue) : NotFound();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteVenue(string id)
    {
        _venueService.DeleteVenue(id);
        return NoContent();
    }
}