export interface UserAccountParking {
  id: number;
  name: string;
  surname: string;
  email: string;
  login: string;
}

export interface ParkingList {
  id: number;
  name: string;
  address: string;
  pricePerHour: number;
  owner: UserAccountParking;
  parkingSpots: ParkingSpot[];
  parkingLayoutImageData?: string;
}

export interface ParkingSpot {
  id: number;
  spotNumber: number;
  reservations: ReservationParking[];
}

export interface ReservationParking {
  reservedBy: UserAccountParking;
  reservedFrom: Date;
  reservedUntil: Date;
}
