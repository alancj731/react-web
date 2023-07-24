using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.ServiceExtensions
{
    public static class AddServiceExtensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            // add DbContext service
            services.AddDbContext<DataContext>(opt =>
            {
                // use Sqlite, "DefaultConnection" can be set in appsettings.Development.json 
                opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
            });
            // add CORS service
            services.AddCors(opt =>
            {
                opt.AddPolicy("LocalPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });

            // add Mediator service, dependency injection
            services.AddMediatR(typeof(List.Handler));
            // add AutoMapper service
            services.AddAutoMapper(typeof(ProfileMapper).Assembly);

            return services;
        }
    }
}