using Microsoft.EntityFrameworkCore;
using server.data;
using server.Services;
using Vonage.Request;
using Vonage;
using Microsoft.Extensions.Configuration;
using Serilog;
using Serilog.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo.Console()
    .WriteTo.File("logs/log-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

// Add Serilog as the logging provider
builder.Services.AddLogging(loggingBuilder =>
{
    loggingBuilder.ClearProviders();
    loggingBuilder.AddSerilog(dispose: true);
});

// Get environment
var environment = builder.Environment.EnvironmentName;

// Configure database based on environment
if (environment == "Development")
{
    // Use SQLite for development
    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseSqlite("Data Source=appdata.db"));
}
else
{
    // For production, try to get connection string from environment
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    
    if (string.IsNullOrEmpty(connectionString))
    {
        // Try to get Railway connection string
        var railwayUrl = Environment.GetEnvironmentVariable("RAILWAY_DATABASE_URL");
        if (!string.IsNullOrEmpty(railwayUrl))
        {
            var uri = new Uri(railwayUrl);
            var userInfo = uri.UserInfo.Split(':');
            connectionString = $"Host={uri.Host};Port={uri.Port};Database={uri.AbsolutePath.TrimStart('/')};Username={userInfo[0]};Password={userInfo[1]};SSL Mode=Require";
        }
    }

    if (!string.IsNullOrEmpty(connectionString))
    {
        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(connectionString));
    }
    else
    {
        // Fallback to SQLite if no connection string is found
        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlite("Data Source=appdata.db"));
    }
}

// Register CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();
        if (allowedOrigins == null || !allowedOrigins.Any())
        {
            // Default to localhost in development
            policy.WithOrigins("http://localhost:11534")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
        else
        {
            policy.WithOrigins(allowedOrigins)
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpClient<IMessagingService, MessagingService>();

// Load configuration
var configuration = builder.Configuration;

// Create credentials
var credentials = Credentials.FromApiKeyAndSecret(
    configuration["ApiKey"],
    configuration["ApiSecret"]
);

builder.Services.AddSingleton(sp =>
{
    var credentials = Credentials.FromApiKeyAndSecret(
        configuration["ApiKey"],
        configuration["ApiSecret"]
    );
    return new VonageClient(credentials);
});

// Register MessagingService with the phone number from configuration
builder.Services.AddScoped<IMessagingService>(sp => 
    new MessagingService(
        sp.GetRequiredService<VonageClient>(),
        configuration["VonagePhoneNumber"],
        sp.GetRequiredService<ILogger<MessagingService>>()
    )
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Always use HTTPS in production
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseRouting();
app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();

app.Run();
