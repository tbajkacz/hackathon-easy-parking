using EasyParking.Users.Dto;
using System;

namespace EasyParking.Parkings.Dto
{
    public class ReservationDto
    {
        public int Id { get; set; }

        public string VehicleRegistrationNumber { get; set; }

        public UserAccountParkingDto ReservedBy { get; set; }

        public DateTime FromUtc { get; set; }

        public DateTime UntilUtc { get; set; }

        public ParkingSpotReservationDto ReservedSpot { get; set; }
    }
}
