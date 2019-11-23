namespace EasyParking.Parkings.Dto
{
    public class ParkingSpotReservationDto
    {
        public int Id { get; set; }

        public int SpotNumber { get; set; }

        public ParkingReservationDto Parking { get; set; }
    }
}
