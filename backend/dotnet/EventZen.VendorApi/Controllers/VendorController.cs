using Microsoft.AspNetCore.Mvc;
using EventZen.VendorApi.Models;
using EventZen.VendorApi.Services;

namespace EventZen.VendorApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VendorsController : ControllerBase
{
    private readonly VendorService _vendorService;

    public VendorsController(VendorService vendorService)
    {
        _vendorService = vendorService;
    }

    [HttpGet]
    public ActionResult<List<Vendor>> GetAllVendors()
    {
        return Ok(_vendorService.GetAllVendors());
    }

    [HttpGet("{id}")]
    public ActionResult<Vendor> GetVendorById(string id)
    {
        var vendor = _vendorService.GetVendorById(id);
        return vendor != null ? Ok(vendor) : NotFound();
    }

    [HttpGet("event/{eventId}")]
    public ActionResult<List<Vendor>> GetVendorsByEventId(string eventId)
    {
        return Ok(_vendorService.GetVendorsByEventId(eventId));
    }

    [HttpPost]
    public ActionResult<Vendor> CreateVendor([FromBody] Vendor vendor)
    {
        var createdVendor = _vendorService.CreateVendor(vendor);
        return CreatedAtAction(nameof(GetVendorById), new { id = createdVendor.Id }, createdVendor);
    }

    [HttpPut("{id}")]
    public ActionResult<Vendor> UpdateVendor(string id, [FromBody] Vendor updatedVendor)
    {
        var vendor = _vendorService.UpdateVendor(id, updatedVendor);
        return vendor != null ? Ok(vendor) : NotFound();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteVendor(string id)
    {
        _vendorService.DeleteVendor(id);
        return NoContent();
    }
}