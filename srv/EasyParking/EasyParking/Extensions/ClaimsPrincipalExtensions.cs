using System.Linq;
using System.Security.Claims;

namespace EasyParking.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static int GetId(this ClaimsPrincipal claimsPrincipal)
            => int.Parse(claimsPrincipal.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        public static bool TryGetId(this ClaimsPrincipal claimsPrincipal, out int id)
            => int.TryParse(claimsPrincipal.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value, out id);

        public static string GetLogin(this ClaimsPrincipal claimsPrincipal)
            => claimsPrincipal.Claims.SingleOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
    }
}
