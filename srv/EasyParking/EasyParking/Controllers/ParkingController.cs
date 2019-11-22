using AutoMapper;
using EasyParking.Db.Services;
using EasyParking.Parkings.Dto;
using EasyParking.Parkings.Models;
using EasyParking.Parkings.Params;
using EasyParking.Parkings.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyParking.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ParkingController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IParkingRepository parkingRepository;
        private readonly IReservationRepository reservationRepository;
        private readonly IParkingSpotRepository parkingSpotRepository;
        private readonly IUnitOfWork uow;

        public ParkingController(IMapper mapper, IParkingRepository parkingRepository, IReservationRepository reservationRepository,
                                 IParkingSpotRepository parkingSpotRepository, IUnitOfWork uow)
        {
            this.mapper = mapper;
            this.parkingRepository = parkingRepository;
            this.reservationRepository = reservationRepository;
            this.parkingSpotRepository = parkingSpotRepository;
            this.uow = uow;
        }

        [HttpGet]
        public IEnumerable<ParkingDto> GetAll()
        {
            return parkingRepository.GetAll()
                .Select(p => mapper.Map<Parking, ParkingDto>(p));
        }

        [HttpPost]
        public async Task Add(ParkingAddParams param)
        {
            var parking = mapper.Map<ParkingAddParams, Parking>(param);
            await parkingRepository.AddAsync(parking);
            await uow.CommitAsync();
        }

    }
}
