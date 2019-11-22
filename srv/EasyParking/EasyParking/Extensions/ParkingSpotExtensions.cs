using EasyParking.Parkings.Models;
using EasyParking.Utility;
using System;
using System.Linq;

namespace EasyParking.Extensions
{
    public static class ParkingSpotExtensions
    {
        public static bool IsAvailableDuring(this ParkingSpot spot, DateTime from, DateTime to)
        {
            return !spot.Reservations.Any(r => DateTimeComparer.AreOverlapping(from, to, r.FromUtc, r.UntilUtc));
        }
    }
}
