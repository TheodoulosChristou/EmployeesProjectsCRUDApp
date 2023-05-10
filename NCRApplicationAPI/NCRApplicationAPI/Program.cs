using NCRApplicationAPI.Data;
using NCRApplicationAPI.Services.EmployeeService;
using NCRApplicationAPI.Services.ProjectService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddDbContext<DataContext>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


void ConfigureServices(IServiceCollection services)
{
    services.AddCors();
    services.AddControllers();
}

app.UseHttpsRedirection();

app.UseCors(x => x
 .AllowAnyOrigin()
 .AllowAnyMethod()
 .AllowAnyHeader());

app.UseAuthorization();

app.MapControllers();

app.Run();