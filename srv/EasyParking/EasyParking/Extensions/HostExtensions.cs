using EasyParking.Users.Models;
using EasyParking.Users.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using EasyParking.Auth.Constants;
using EasyParking.Auth.Services;
using EasyParking.Db.Services;
using System.Collections.Generic;
using System.Linq;

namespace EasyParking.Extensions
{
    public static class HostExtensions
    {
        public static IHost AddRootUser(this IHost host)
        {
            using var scope = host.Services.CreateScope();
            var userSession = scope.ServiceProvider.GetRequiredService<IUserRepository>();
            var uow = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
            var hashService = scope.ServiceProvider.GetRequiredService<IHashService>();
            if (userSession.GetAll().Count() == 0)
            {
                userSession.AddAsync(new UserAccount
                {
                    Name = "root",
                    Surname = "root",
                    Login = "root",
                    Email = "root@root.com",
                    PasswordHash = hashService.Hash("root"),
                    Roles = new List<string> { Roles.Admin },
                });
                uow.CommitAsync();
            }
            return host;
        }
    }
}
