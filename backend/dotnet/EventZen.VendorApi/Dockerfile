# Use the official .NET runtime as the base image
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
# Set the working directory inside the container
WORKDIR /app
# Copy the published application files
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the application files
COPY . ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:9.0 
WORKDIR /app
COPY --from=build /app/out .

# Expose the port your .NET app runs on (default is 5128)
EXPOSE 5128

# Command to run the application
ENTRYPOINT ["dotnet", "EventZen.VendorApi.dll"]
