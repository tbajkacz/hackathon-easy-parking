using EasyParking.Db.Models;
using EasyParking.Users.Models;
using System.Collections.Generic;

namespace EasyParking.Parkings.Models
{
    public class Parking : Entity<int>
    {
        public virtual string Name { get; set; }

        public virtual string Address { get; set; }

        public virtual long PricePerHour { get; set; }

        public virtual UserAccount Owner { get; set; }

        public virtual IList<ParkingSpot> ParkingSpots { get; set; }
    }

    public class ParkingMap : EntityMap<Parking, int>
    {
        public ParkingMap()
        {
            Map(x => x.Name)
                .Not.Nullable();
            Map(x => x.Address);
            Map(x => x.PricePerHour);
            References(x => x.Owner)
                .Not.Nullable();
            HasMany(x => x.ParkingSpots)
                .Cascade.SaveUpdate();
        }
    }
}
