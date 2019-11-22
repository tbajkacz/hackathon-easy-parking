using EasyParking.Users.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using EasyParking.Extensions;
using System.Threading.Tasks;

namespace EasyParking.Extensions
{
    public static class HttpContextExtensions
    {
        public static async Task SignInAsync(this HttpContext httpContext, UserAccount user, bool rememberMe)
            => await httpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                                             user.GenerateClaims(),
                                             new AuthenticationProperties
                                             {
                                                 AllowRefresh = true,
                                                 IsPersistent = rememberMe,
                                             });
    }
}
