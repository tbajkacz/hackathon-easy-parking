using AutoMapper;
using EasyParking.Users.Dto;
using EasyParking.Users.Models;
using EasyParking.Auth.Params;
using EasyParking.Mapper.Resolvers;
using EasyParking.Parkings.Models;
using EasyParking.Parkings.Dto;
using EasyParking.Parkings.Params;

namespace EasyParking.Mapper
{
    public class DefaultAutoMapperProfile : Profile
    {
        public DefaultAutoMapperProfile()
        {
            CreateMap<UserAccount, UserAccountDto>();
            CreateMap<UserAccount, UserAccountParkingDto>();

            CreateMap<RegisterParams, UserAccount>()
                .ForMember(u => u.PasswordHash, mce => mce.MapFrom<RegisterParamsPasswordHashResolver>());

            CreateMap<Parking, ParkingGetAllDto>();
            CreateMap<Parking, ParkingGetByIdDto>();
            CreateMap<ParkingAddParams, Parking>()
                .ForMember(p => p.Owner, mce => mce.MapFrom<ParkingAddOwnerResolver>())
                .ForMember(p => p.ParkingSpots, mce => mce.MapFrom<ParkingAddSpotsResolver>());
            CreateMap<ParkingSpot, ParkingSpotDto>();
            CreateMap<Reservation, ReservationParkingDto>();
            CreateMap<Reservation, ReservationDto>();
            CreateMap<ParkingSpot, ParkingSpotReservationDto>();
            CreateMap<Parking, ParkingReservationDto>();
        }
    }
}
