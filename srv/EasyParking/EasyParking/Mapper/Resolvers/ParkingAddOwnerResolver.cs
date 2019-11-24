using AutoMapper;
using EasyParking.Parkings.Models;
using EasyParking.Parkings.Params;
using EasyParking.Users.Models;
using EasyParking.Users.Services;

namespace EasyParking.Mapper.Resolvers
{
    public class ParkingAddOwnerResolver : IValueResolver<ParkingAddParams, Parking, UserAccount>
    {
        private readonly IUserRepository userRepository;

        public ParkingAddOwnerResolver(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public UserAccount Resolve(ParkingAddParams source, Parking destination, UserAccount destMember, ResolutionContext context)
        {
            return userRepository.GetByIdOrDefault(source.OwnerId);
        }
    }
}
