using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// add DbContext service
builder.Services.AddDbContext<DataContext>(opt => {
    // use Sqlite, "DefaultConnection" can be set in appsettings.Development.json 
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
// add CORS service
builder.Services.AddCors(opt => 
{
    opt.AddPolicy("LocalPolicy", policy =>
    {
        policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("LocalPolicy");

app.MapControllers();

// will be destroyed after using
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try {
    // do database migration
    var context = services.GetRequiredService<DataContext>();
    context.Database.Migrate();
    await Seed.SeedData(context);
}
catch (Exception ex){

    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}



app.Run();
