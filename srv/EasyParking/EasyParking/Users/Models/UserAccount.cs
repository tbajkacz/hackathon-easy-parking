using EasyParking.Db.Models;
using System.Collections.Generic;

namespace EasyParking.Users.Models
{
    public class UserAccount : Entity<int>
    {
        public virtual string Name { get; set; }

        public virtual string Surname { get; set; }

        public virtual string Email { get; set; }

        public virtual string Login { get; set; }

        public virtual string PasswordHash { get; set; }

        public virtual long Balance { get; set; } = 0;

        public virtual IList<string> Roles { get; set; } = new List<string> { };
    }

    public class UserAccountMap : EntityMap<UserAccount, int>
    {
        public UserAccountMap()
        {
            Map(x => x.Name)
                .Not.Nullable();
            Map(x => x.Surname)
                .Not.Nullable();
            Map(x => x.Email)
                .Not.Nullable();
            Map(x => x.Login)
                .Not.Nullable()
                .Unique();
            Map(x => x.PasswordHash)
                .Not.Nullable();
            Map(x => x.Balance);
            HasMany(x => x.Roles)
                .Table("Roles")
                .Element("Role");
        }
    }
}
