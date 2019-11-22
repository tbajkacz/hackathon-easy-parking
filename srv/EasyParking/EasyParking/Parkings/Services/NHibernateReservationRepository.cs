using EasyParking.Db.Services;
using EasyParking.Parkings.Models;
using NHibernate;

namespace EasyParking.Parkings.Services
{
    public class NHibernateReservationRepository : NHibernateRepositoryBase<Reservation, int>, IReservationRepository
    {
        public NHibernateReservationRepository(ISession session)
            : base(session)
        {
        }
    }
}
