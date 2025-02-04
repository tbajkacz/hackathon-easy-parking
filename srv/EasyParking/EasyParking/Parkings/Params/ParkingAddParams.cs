﻿namespace EasyParking.Parkings.Params
{
    public class ParkingAddParams
    {
        public string Name { get; set; }

        public string Address { get; set; }

        public long PricePerHour { get; set; }

        public int ParkingSpotsAmount { get; set; }

        public string ParkingLayoutImageData { get; set; }
    }
}
