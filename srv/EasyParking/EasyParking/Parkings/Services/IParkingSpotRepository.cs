using EasyParking.Db.Services;
using EasyParking.Parkings.Models;

namespace EasyParking.Parkings.Services
{
    public interface IParkingSpotRepository : IRepository<ParkingSpot, int>
    {
    }
}
