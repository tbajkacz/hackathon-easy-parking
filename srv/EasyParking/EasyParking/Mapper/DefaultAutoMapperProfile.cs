using AutoMapper;
using EasyParking.Users.Dto;
using EasyParking.Users.Models;
using EasyParking.Auth.Params;
using EasyParking.Mapper.Resolvers;

namespace EasyParking.Mapper
{
    public class DefaultAutoMapperProfile : Profile
    {
        public DefaultAutoMapperProfile()
        {
            CreateMap<UserAccount, UserAccountDto>();

            CreateMap<RegisterParams, UserAccount>()
                .ForMember(u => u.PasswordHash, mce => mce.MapFrom<RegisterParamsPasswordHashResolver>());
        }
    }
}
