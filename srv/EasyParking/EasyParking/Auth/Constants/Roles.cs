using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace EasyParking.Auth.Constants
{
    public static class Roles
    {
        public const string Admin = "admin";

        public static readonly IReadOnlyCollection<string> RolesCollection
            = typeof(Roles).GetFields(BindingFlags.Public | BindingFlags.Static)
                .Where(f => f.IsLiteral && !f.IsInitOnly)
                .Select(f => (string)f.GetRawConstantValue())
                .ToList();
    }
}
