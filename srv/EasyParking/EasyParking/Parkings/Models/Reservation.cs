using EasyParking.Db.Models;
using EasyParking.Users.Models;
using System;

namespace EasyParking.Parkings.Models
{
    public class Reservation : Entity<int>
    {
        public virtual UserAccount ReservedBy { get; set; }

        public virtual string VehicleRegistrationNumber { get; set; }

        /// <summary>
        /// May provide incorrect hour due to db conversions use <see cref="FromUtc"/> instead
        /// </summary>
        public virtual DateTime ReservedFrom { get; set; }

        /// <summary>
        /// May provide incorrect hour due to db conversions use <see cref="UntilUtc"/> instead
        /// </summary>
        public virtual DateTime ReservedUntil { get; set; }

        public virtual ParkingSpot ReservedSpot { get; set; }

        public virtual DateTime FromUtc => ReservedFrom.ToUniversalTime();

        public virtual DateTime UntilUtc => ReservedUntil.ToUniversalTime();
    }

    public class ReservationMap : EntityMap<Reservation, int>
    {
        public ReservationMap()
        {
            References(x => x.ReservedBy)
                .Not.Nullable();
            Map(x => x.VehicleRegistrationNumber)
                .Not.Nullable();
            Map(x => x.ReservedFrom);
            Map(x => x.ReservedUntil);
            References(x => x.ReservedSpot);
        }
    }

}
