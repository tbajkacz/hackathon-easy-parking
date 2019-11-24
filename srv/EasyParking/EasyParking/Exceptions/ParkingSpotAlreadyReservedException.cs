using System;

namespace EasyParking.Exceptions
{
    public class ParkingSpotAlreadyReservedException : Exception
    {
        public ParkingSpotAlreadyReservedException(int parkingId, string parkingName, int spotNumber)
            : base($"Parking {parkingId}, {parkingName} spot {spotNumber} is already reserved during the selected time")
        {
        }
    }
}
