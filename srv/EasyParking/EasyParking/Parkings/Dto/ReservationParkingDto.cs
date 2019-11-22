using EasyParking.Users.Dto;
using System;

namespace EasyParking.Parkings.Dto
{
    public class ReservationParkingDto
    {
        public UserAccountParkingDto ReservedBy { get; set; }

        public DateTime ReservedFrom { get; set; }

        public DateTime ReservedUntil { get; set; }
    }
}
