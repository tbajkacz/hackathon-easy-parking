using EasyParking.Users.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyParking.Parkings.Dto
{
    public class ParkingGetByIdDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public long PricePerHour { get; set; }

        public UserAccountParkingDto Owner { get; set; }

        public string ParkingLayoutImageData { get; set; }

        public IList<ParkingSpotDto> ParkingSpots { get; set; }
    }
}
