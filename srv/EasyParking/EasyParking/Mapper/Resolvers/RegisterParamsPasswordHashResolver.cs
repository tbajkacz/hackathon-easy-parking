using AutoMapper;
using EasyParking.Users.Models;
using EasyParking.Auth.Params;
using EasyParking.Auth.Services;

namespace EasyParking.Mapper.Resolvers
{
    public class RegisterParamsPasswordHashResolver : IValueResolver<RegisterParams, UserAccount, string>
    {
        private readonly IHashService hashService;

        public RegisterParamsPasswordHashResolver(IHashService hashService)
        {
            this.hashService = hashService;
        }

        public string Resolve(RegisterParams source, UserAccount destination, string destMember, ResolutionContext context)
        {
            return hashService.Hash(source.Password);
        }
    }
}
