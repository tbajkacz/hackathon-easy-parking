export interface UserAccountParking {
  id: number;
  name: string;
  surname: string;
  email: string;
  login: string;
}

export interface Parking {
  id: number;
  name: string;
  address: string;
  pricePerHour: number;
  owner: UserAccountParking;
  parkingSpots: ParkingSpot[];
  parkingLayoutImageData?: string;
  availableSpots: string;
}

export interface ParkingSpot {
  id: number;
  spotNumber: number;
  reservations: ReservationParking[];
}

export interface ReservationParking {
  reservedBy: UserAccountParking;
  fromUtc: string;
  untilUtc: string;
}

export interface ReserveData {
  parkingId: number;
  vehicleRegistrationNumber: string;
  spotNumber: number;
  from: string;
  to: string;
}

export interface SpotExclude {
  spotNumber: number;
  exclude: Date;
}
