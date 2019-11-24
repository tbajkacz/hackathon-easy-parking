using System;

namespace EasyParking.Parkings.Params
{
    public class ReserveParams
    {
        public int ParkingId { get; set; }

        public string VehicleRegistrationNumber { get; set; }

        public int SpotNumber { get; set; }

        public DateTime From { get; set; }

        public DateTime To { get; set; }
    }
}
