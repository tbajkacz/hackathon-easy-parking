using System.Collections.Generic;

namespace EasyParking.Parkings.Dto
{
    public class ParkingSpotDto
    {
        public int Id { get; set; }

        public int SpotNumber { get; set; }

        public IList<ReservationParkingDto> Reservations { get; set; }
    }
}
