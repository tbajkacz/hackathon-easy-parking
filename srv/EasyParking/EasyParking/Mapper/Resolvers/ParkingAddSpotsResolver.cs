using AutoMapper;
using EasyParking.Parkings.Models;
using EasyParking.Parkings.Params;
using System.Collections.Generic;
using System.Linq;

namespace EasyParking.Mapper.Resolvers
{
    public class ParkingAddSpotsResolver : IValueResolver<ParkingAddParams, Parking, IList<ParkingSpot>>
    {
        public IList<ParkingSpot> Resolve(ParkingAddParams source, Parking destination, IList<ParkingSpot> destMember, ResolutionContext context)
        {
            int index = 1;
            return Enumerable.Range(0, source.ParkingSpotsAmount)
                .Select(_ => new ParkingSpot { SpotNumber = index++, Reservations = new List<Reservation>() })
                .ToList();
        }
    }
}
