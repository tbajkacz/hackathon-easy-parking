﻿using AutoMapper;
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
        private readonly IUnitOfWork uow;

        public ReservationsController(IMapper mapper, IReservationRepository reservationRepository, IUnitOfWork uow)
        {
            this.mapper = mapper;
            this.reservationRepository = reservationRepository;
            this.uow = uow;
        }

        [HttpGet]
        public IEnumerable<ReservationDto> GetUserReservations()
        {
            return reservationRepository.GetAll()
                .Where(r => r.ReservedBy.Id == HttpContext.User.GetId())
                .Select(r => mapper.Map<Reservation, ReservationDto>(r));
        }

        [HttpPost]
        public async Task Reserve(ReserveParams param)
        {
            await reservationRepository.ReserveSpotAsync(param, HttpContext.User.GetId());
            await uow.CommitAsync();
        }

        [HttpPost]
        public async Task CancelReservation(ReservationCancelParams param)
        {
            await reservationRepository.CancelReservationAsync(param.ReservationId, HttpContext.User.GetId());
            await uow.CommitAsync();
        }

        [HttpGet]
        public async Task<IsAvailableDto> IsAvailableDuring([FromQuery]IsAvailableParams param)
        {
            return new IsAvailableDto
            {
                IsAvailable = await reservationRepository.IsSpotAvailable(param.ParkingId, param.SpotNumber, param.From, param.To)
            };
        }
    }
}
