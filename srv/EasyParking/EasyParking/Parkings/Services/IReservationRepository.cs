using EasyParking.Db.Services;
using EasyParking.Parkings.Models;
using EasyParking.Parkings.Params;
using System;
using System.Threading.Tasks;

namespace EasyParking.Parkings.Services
{
    public interface IReservationRepository : IRepository<Reservation, int>
    {
        Task ReserveSpotAsync(ReserveParams param, int userId);

        Task CancelReservationAsync(int reservationId, int userId);

        Task<bool> IsSpotAvailable(int parkingId, int spotNumber, DateTime from, DateTime to);
    }
}
