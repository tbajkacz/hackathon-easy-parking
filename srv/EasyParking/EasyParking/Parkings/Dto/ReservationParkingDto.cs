using EasyParking.Users.Dto;
using System;

namespace EasyParking.Parkings.Dto
{
    public class ReservationParkingDto
    {
        public UserAccountParkingDto ReservedBy { get; set; }

        public DateTime FromUtc { get; set; }

        public DateTime UntilUtc { get; set; }
    }
}
