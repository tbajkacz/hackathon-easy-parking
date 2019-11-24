using EasyParking.Db.Services;
using EasyParking.Parkings.Models;
using EasyParking.Parkings.Params;
using System;
using System.Threading.Tasks;

namespace EasyParking.Parkings.Services
{
    public interface IParkingRepository : IRepository<Parking, int>
    {
        Task ReserveSpotAsync(ReserveParams param, int userId);

        Task<bool> IsAvailable(int parkingId, int spotNumber, DateTime from, DateTime to);
    }
}
