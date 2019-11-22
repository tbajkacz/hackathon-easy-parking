using AutoMapper;
using EasyParking.Db.Services;
using EasyParking.Exceptions;
using EasyParking.Extensions;
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
    public class ReservationsController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IReservationRepository reservationRepository;
        private readonly IParkingRepository parkingRepository;
        private readonly IUnitOfWork uow;

        public ReservationsController(IMapper mapper, IReservationRepository reservationRepository,
                                      IParkingRepository parkingRepository, IUnitOfWork uow)
        {
            this.mapper = mapper;
            this.reservationRepository = reservationRepository;
            this.parkingRepository = parkingRepository;
            this.uow = uow;
        }

        [HttpGet]
        public IEnumerable<ReservationDto> GetReservations()
        {
            return reservationRepository.GetAll()
                .Select(r => mapper.Map<Reservation, ReservationDto>(r));
        }

        [HttpPost]
        public async Task Reserve(ReserveParams param)
        {
            await parkingRepository.ReserveSpotAsync(param, HttpContext.User.GetId());
            await uow.CommitAsync();
        }

        [HttpGet]
        public async Task<IsAvailableDto> IsAvailableDuring([FromQuery]IsAvailableParams param)
        {
            return new IsAvailableDto
            {
                IsAvailable = await parkingRepository.IsAvailable(param.ParkingId, param.SpotNumber, param.From, param.To)
            };
        }
    }
}
