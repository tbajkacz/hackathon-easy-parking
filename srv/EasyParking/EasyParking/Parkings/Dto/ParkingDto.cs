using EasyParking.Parkings.Models;
using EasyParking.Users.Dto;
using System.Collections.Generic;

namespace EasyParking.Parkings.Dto
{
    public class ParkingDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public long PricePerHour { get; set; }

        public UserAccountParkingDto Owner { get; set; }

        public IList<ParkingSpotDto> ParkingSpots { get; set; }
    }
}
