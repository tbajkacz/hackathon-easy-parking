using EasyParking.Db.Services;
using EasyParking.Parkings.Models;
using System.Threading.Tasks;

namespace EasyParking.Parkings.Services
{
    public interface IReservationRepository : IRepository<Reservation, int>
    {
        Task CancelReservationAsync(int reservationId, int userId);
    }
}
