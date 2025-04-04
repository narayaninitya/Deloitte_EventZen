using EventZen.VendorApi.Data;
using EventZen.VendorApi.Models;
using EventZen.VendorApi.Services;

var builder = WebApplication.CreateBuilder(args);

// First add environment variables to the configuration
builder.Configuration.AddEnvironmentVariables();

// Then configure MongoDB settings using the updated configuration
builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDb"));

builder.Services.AddSingleton<MongoDbContext>();
builder.Services.AddScoped<VendorService>();
builder.Services.AddScoped<VenueService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "EventZen Vendor API", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "EventZen Vendor API v1"));
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();