using System;

namespace EasyParking.Exceptions
{
    public class ParkingSpotNotFoundException : Exception
    {
        public ParkingSpotNotFoundException(int parkingId, string parkingName, int spotNumber) 
            : base($"Parking {parkingId}, {parkingName} has no spot with number {spotNumber}")
        {
        }
    }
}
