using EasyParking.Db.Services;
using EasyParking.Parkings.Models;
using NHibernate;

namespace EasyParking.Parkings.Services
{
    public class NHibernateParkingRepository : NHibernateRepositoryBase<Parking, int>, IParkingRepository
    {
        public NHibernateParkingRepository(ISession session) 
            : base(session)
        {
        }
    }
}
