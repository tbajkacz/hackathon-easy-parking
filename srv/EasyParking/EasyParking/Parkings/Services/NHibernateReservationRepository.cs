using System.Threading.Tasks;
using EasyParking.Db.Services;
using EasyParking.Exceptions;
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

        public async Task CancelReservationAsync(int reservationId, int userId)
        {
            var reservation = await GetByIdAsync(reservationId);
            if (reservation.ReservedBy.Id != userId)
            {
                throw new MissingPermissionsException(userId, nameof(CancelReservationAsync), typeof(Reservation), reservationId);
            }
            await DeleteAsync(reservationId);
        }
    }
}
