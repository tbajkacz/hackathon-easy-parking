using System;
using System.Linq;
using System.Threading.Tasks;
using EasyParking.Db.Services;
using EasyParking.Exceptions;
using EasyParking.Extensions;
using EasyParking.Parkings.Models;
using EasyParking.Parkings.Params;
using EasyParking.Users.Services;
using NHibernate;

namespace EasyParking.Parkings.Services
{
    public class NHibernateParkingRepository : NHibernateRepositoryBase<Parking, int>, IParkingRepository
    {
        private readonly IUserRepository userRepository;
        private readonly IParkingSpotRepository parkingSpotRepository;
        private readonly IReservationRepository reservationRepository;

        public NHibernateParkingRepository(ISession session, IUserRepository userRepository,
                                           IParkingSpotRepository parkingSpotRepository, IReservationRepository reservationRepository) 
            : base(session)
        {
            this.userRepository = userRepository;
            this.parkingSpotRepository = parkingSpotRepository;
            this.reservationRepository = reservationRepository;
        }

        public async Task<bool> IsAvailable(int parkingId, int spotNumber, DateTime from, DateTime to)
        {
            var spot = await GetParkingSpotAsync(parkingId, spotNumber);
            return spot.IsAvailableDuring(from, to);
        }

        public async Task ReserveSpotAsync(ReserveParams param, int userId)
        {
            var spot = await GetParkingSpotAsync(param.ParkingId, param.SpotNumber);
            if (!spot.IsAvailableDuring(param.From, param.To))
            {
                throw new ParkingSpotAlreadyReservedException(param.ParkingId, (await GetByIdAsync(param.ParkingId)).Name, param.SpotNumber);
            }
            var reservation = new Reservation
            {
                ReservedBy = await userRepository.GetByIdAsync(userId),
                ReservedFrom = param.From.ToUniversalTime(),
                ReservedUntil = param.To.ToUniversalTime(),
                VehicleRegistrationNumber = param.VehicleRegistrationNumber
            };
            await reservationRepository.AddAsync(reservation);
            
            spot.Reservations.Add(reservation);
            await parkingSpotRepository.UpdateAsync(spot);
        }

        private async Task<ParkingSpot> GetParkingSpotAsync(int parkingId, int spotNumber)
        {
            var parking = await GetByIdAsync(parkingId);
            return parking.ParkingSpots
                .SingleOrDefault(s => s.SpotNumber == spotNumber)
                ?? throw new ParkingSpotNotFoundException(parking.Id, parking.Name, spotNumber);
        }
    }
}
