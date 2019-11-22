using System.Collections.Generic;

namespace EasyParking.Users.Dto
{
    public class UserAccountDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string Email { get; set; }

        public long Balance { get; set; }

        public string Login { get; set; }

        public IList<string> Roles { get; set; }
    }
}
