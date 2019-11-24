using EasyParking.Db.Services;
using EasyParking.Parkings.Models;
using NHibernate;

namespace EasyParking.Parkings.Services
{
    public class NHibernateParkingSpotRepository : NHibernateRepositoryBase<ParkingSpot, int>, IParkingSpotRepository
    {
        public NHibernateParkingSpotRepository(ISession session)
            : base(session)
        {
        }
    }
}
