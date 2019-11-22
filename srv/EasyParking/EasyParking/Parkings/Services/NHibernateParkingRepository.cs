using System.Linq;
using System.Threading.Tasks;
using EasyParking.Db.Services;
using EasyParking.Exceptions;
using EasyParking.Parkings.Models;
using EasyParking.Parkings.Params;
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
