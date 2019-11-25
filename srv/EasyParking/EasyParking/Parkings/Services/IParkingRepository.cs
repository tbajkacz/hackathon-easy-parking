using EasyParking.Db.Services;
using EasyParking.Parkings.Models;

namespace EasyParking.Parkings.Services
{
    public interface IParkingRepository : IRepository<Parking, int>
    {
    }
}
