using EasyParking.Db.Services;
using EasyParking.Parkings.Models;

namespace EasyParking.Parkings.Services
{
    public interface IReservationRepository : IRepository<Reservation, int>
    {
    }
}
