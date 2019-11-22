using EasyParking.Db.Services;
using EasyParking.Parkings.Models;
using EasyParking.Parkings.Params;
using System.Threading.Tasks;

namespace EasyParking.Parkings.Services
{
    public interface IParkingRepository : IRepository<Parking, int>
    {
        
    }
}
