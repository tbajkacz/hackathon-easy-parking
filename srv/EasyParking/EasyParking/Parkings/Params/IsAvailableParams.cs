﻿using System;

namespace EasyParking.Parkings.Params
{
    public class IsAvailableParams
    {
        public int ParkingId { get; set; }

        public int SpotNumber { get; set; }

        public DateTime From { get; set; }

        public DateTime To { get; set; }
    }
}
