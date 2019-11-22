using EasyParking.Users.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace EasyParking.Extensions
{
    public static class UserAccountExtensions
    {
        public static ClaimsPrincipal GenerateClaims(this UserAccount user)
        {
            var roleClaims = user.Roles.Select(r => new Claim(ClaimTypes.Role, r));
            var identityClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Login),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            };

            return new ClaimsPrincipal(new ClaimsIdentity(roleClaims.Concat(identityClaims), CookieAuthenticationDefaults.AuthenticationScheme));
        }
    }
}
