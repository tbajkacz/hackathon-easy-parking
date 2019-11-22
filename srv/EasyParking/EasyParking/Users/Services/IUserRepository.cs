using EasyParking.Users.Models;
using EasyParking.Auth.Params;
using EasyParking.Db.Services;
using System.Threading.Tasks;

namespace EasyParking.Users.Services
{
    public interface IUserRepository : IRepository<UserAccount, int>
    {
        Task<UserAccount> ValidateCredentialsAsync(AuthParams param);
    }
}
