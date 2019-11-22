using AutoMapper;
using EasyParking.Users.Dto;
using EasyParking.Users.Models;
using EasyParking.Users.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EasyParking.Auth.Params;
using EasyParking.Db.Services;
using EasyParking.Extensions;
using System.Net;
using System.Threading.Tasks;

namespace RSRL.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository userSession;
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public AuthController(IUserRepository userSession, IUnitOfWork uow, IMapper mapper)
        {
            this.userSession = userSession;
            this.uow = uow;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task SignIn(AuthParams param)
        {
            var user = await userSession.ValidateCredentialsAsync(param);
            if (user == null)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                return;
            }
            await HttpContext.SignInAsync(user, param.RememberMe);
        }

        [HttpGet]
        [Authorize]
        public async Task SignOut()
        {
            await HttpContext.SignOutAsync();
        }

        [HttpPost]
        public async Task Register(RegisterParams param)
        {
            var user = mapper.Map<RegisterParams, UserAccount>(param);
            await userSession.AddAsync(user);
            await uow.CommitAsync();
        }

        [HttpGet]
        public async Task<UserAccountDto> GetCurrentUser()
        {
            if (!HttpContext.User.TryGetId(out int id) ||
                !(await userSession.GetByIdOrDefaultAsync(id) is UserAccount user))
            {
                return null;
            }
            return mapper.Map<UserAccount, UserAccountDto>(user);
        }
    }
}
