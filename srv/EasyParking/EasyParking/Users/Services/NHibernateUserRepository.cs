using System.Threading.Tasks;
using EasyParking.Users.Models;
using NHibernate;
using NHibernate.Linq;
using EasyParking.Auth.Params;
using EasyParking.Auth.Services;
using EasyParking.Db.Services;

namespace EasyParking.Users.Services
{
    public class NHibernateUserRepository : NHibernateRepositoryBase<UserAccount, int>, IUserRepository
    {
        private readonly IHashService hashService;

        public NHibernateUserRepository(ISession session, IHashService hashService)
            : base(session)
        {
            this.hashService = hashService;
        }

        public async Task<UserAccount> ValidateCredentialsAsync(AuthParams param)
        {
            var user = await session.Query<UserAccount>()
                .SingleOrDefaultAsync(u => u.Login == param.Login);

            return user == null ? null : hashService.CompareHashes(param.Password, user.PasswordHash) ? user : null;
        }
    }
}
