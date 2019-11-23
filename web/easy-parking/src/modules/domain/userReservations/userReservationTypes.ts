import { UserAccountParking } from "../reservation/reservationTypes";

export interface ParentParking {
  id: number;
  name: string;
  address: string;
  pricePerHour: number;
  owner: UserAccountParking;
}

export interface UserReservation {
  id: number;
  reservedBy: UserAccountParking;
  fromUtc: Date;
  untilUtc: Date;
  reservedSpot: ReservedSpot;
}

export interface ReservedSpot {
  id: number;
  spotNumber: number;
  parking: ParentParking;
}
