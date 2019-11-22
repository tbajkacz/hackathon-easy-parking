using EasyParking.Db.Models;
using EasyParking.Users.Models;
using System;

namespace EasyParking.Parkings.Models
{
    public class Reservation : Entity<int>
    {
        public virtual UserAccount ReservedBy { get; set; }

        public virtual DateTime ReservedFrom { get; set; }

        public virtual DateTime ReservedUntil { get; set; }

        public virtual ParkingSpot ReservedSpot { get; set; }
    }

    public class ReservationMap : EntityMap<Reservation, int>
    {
        public ReservationMap()
        {
            References(x => x.ReservedBy)
                .Not.Nullable();
            Map(x => x.ReservedFrom);
            Map(x => x.ReservedUntil);
            References(x => x.ReservedSpot);
        }
    }

}
