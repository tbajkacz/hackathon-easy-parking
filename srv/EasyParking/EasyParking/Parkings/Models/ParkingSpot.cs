using EasyParking.Db.Models;
using System.Collections.Generic;

namespace EasyParking.Parkings.Models
{
    public class ParkingSpot : Entity<int>
    {
        public virtual int SpotNumber { get; set; }

        public virtual IList<Reservation> Reservations { get; set; }

        public virtual Parking Parent { get; set; }
    }

    public class ParkingSpotMap : EntityMap<ParkingSpot, int>
    {
        public ParkingSpotMap()
        {
            Map(x => x.SpotNumber);
            HasMany(x => x.Reservations)
                .Cascade.SaveUpdate();
            References(x => x.Parent);
        }
    }
}
