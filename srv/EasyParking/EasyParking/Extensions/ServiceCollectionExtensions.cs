using EasyParking.Exceptions;
using EasyParking.Users.Services;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using NHibernate.Tool.hbm2ddl;
using EasyParking.Auth.Constants;
using EasyParking.Db.Conventions;
using EasyParking.Db.Services;
using System;
using System.Data;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace EasyParking.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddNHibernateSessionFactory(this IServiceCollection services, string connectionString)
        {
            var fact = Fluently.Configure()
                .Database(SQLiteConfiguration.Standard.UsingFile(connectionString).IsolationLevel(IsolationLevel.ReadCommitted))
                .Mappings(x => x.FluentMappings.AddFromAssemblyOf<Program>().Conventions.Add<IncrementIdConvention>())
                .ExposeConfiguration(x =>
                    new SchemaUpdate(x).Execute(false, true))
                .BuildSessionFactory();
            return services.AddScoped(p => fact.OpenSession())
                .AddScoped<IUnitOfWork, NHibernateUnitOfWork>();
        }

        public static IServiceCollection AddNHibernateRepositories(this IServiceCollection services)
            => services.AddTransient<IUserRepository, NHibernateUserRepository>();

        public static AuthenticationBuilder AddCookieAuthentication(this IServiceCollection services, CookieSecurePolicy cookieSecurePolicy)
            => services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(cfg =>
                {
                    cfg.Cookie.SecurePolicy = cookieSecurePolicy;

                    cfg.Events = new CookieAuthenticationEvents
                    {
                        OnValidatePrincipal = async context =>
                        {
                            var userSession = context.HttpContext.RequestServices.GetRequiredService<IUserRepository>();
                            try
                            {
                                var userId = context.Principal.GetId();
                                var user = await userSession.GetByIdAsync(userId);
                                var claimRoles = context.Principal.Claims.Where(c => c.Type == ClaimTypes.Role)
                                    .Select(c => c.Value);
                                if (!(claimRoles.Except(user.Roles).Count() == 0 && user.Roles.Except(claimRoles).Count() == 0))
                                {
                                    context.RejectPrincipal();
                                }
                            }
                            catch (Exception e) when (e is FormatException || e is EntityNotFoundException)
                            {
                                context.RejectPrincipal();
                            }
                        },
                        OnRedirectToAccessDenied = context =>
                        {
                            context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                            return Task.CompletedTask;
                        },
                        OnRedirectToLogin = context =>
                        {
                            context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                            return Task.CompletedTask;
                        },
                    };
                });

        public static IServiceCollection AddAuthorizationWithPolicies(this IServiceCollection services)
            => services.AddAuthorization(cfg =>
            {
                cfg.AddPolicy(Policies.Admin, p => p.RequireRole(Roles.Admin));
            });
    }
}
