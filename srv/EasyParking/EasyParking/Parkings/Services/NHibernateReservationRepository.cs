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
    public class NHibernateReservationRepository : NHibernateRepositoryBase<Reservation, int>, IReservationRepository
    {
        private readonly IUserRepository userRepository;
        private readonly IParkingSpotRepository parkingSpotRepository;
        private readonly IParkingRepository parkingRepository;

        public NHibernateReservationRepository(ISession session, IUserRepository userRepository,
                                           IParkingSpotRepository parkingSpotRepository, IParkingRepository parkingRepository)
            : base(session)
        {
            this.userRepository = userRepository;
            this.parkingSpotRepository = parkingSpotRepository;
            this.parkingRepository = parkingRepository;
        }

        public async Task CancelReservationAsync(int reservationId, int userId)
        {
            var reservation = await GetByIdAsync(reservationId);
            if (reservation.ReservedBy.Id != userId)
            {
                throw new MissingPermissionsException(userId, nameof(CancelReservationAsync), typeof(Reservation), reservationId);
            }
            await DeleteAsync(reservationId);
        }

        public async Task<bool> IsSpotAvailable(int parkingId, int spotNumber, DateTime from, DateTime to)
        {
            var spot = await GetParkingSpotAsync(parkingId, spotNumber);
            return spot.IsAvailableDuring(from, to);
        }

        public async Task ReserveSpotAsync(ReserveParams param, int userId)
        {
            var spot = await GetParkingSpotAsync(param.ParkingId, param.SpotNumber);
            if (!spot.IsAvailableDuring(param.From, param.To))
            {
                throw new ParkingSpotAlreadyReservedException(param.ParkingId, (await parkingRepository.GetByIdAsync(param.ParkingId)).Name, param.SpotNumber);
            }
            var reservation = new Reservation
            {
                ReservedBy = await userRepository.GetByIdAsync(userId),
                ReservedFrom = param.From.ToUniversalTime(),
                ReservedUntil = param.To.ToUniversalTime(),
                VehicleRegistrationNumber = param.VehicleRegistrationNumber
            };
            await AddAsync(reservation);

            spot.Reservations.Add(reservation);
            await parkingSpotRepository.UpdateAsync(spot);
        }

        private async Task<ParkingSpot> GetParkingSpotAsync(int parkingId, int spotNumber)
        {
            var parking = await parkingRepository.GetByIdAsync(parkingId);
            return parking.ParkingSpots
                .SingleOrDefault(s => s.SpotNumber == spotNumber)
                ?? throw new ParkingSpotNotFoundException(parking.Id, parking.Name, spotNumber);
        }
    }
}
