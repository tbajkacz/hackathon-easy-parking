import React, { useEffect, useState } from "react";
import MainTemplate from "../../../templates/MainTemplate";
import "./Reservation.scss";
import reservationService from "./reservationService";
import { ApiResponse } from "../../../common/types";
import { ParkingList } from "./reservationTypes";
import LoadingIndicator from "../../../utils/LoadingIndicator";

interface ReservationProps {}

const Reservation: React.FC<ReservationProps> = props => {
  const [promise, setPromise] = useState<Promise<any> | undefined>(undefined);
  const [parkingList, setParkingList] = useState<ApiResponse<ParkingList[]>>();
  useEffect(() => {
    const fetchParkingList = async () => {
      const promise = reservationService.getAllParking();
      setPromise(promise);
      const res = await promise;
      setParkingList(res);
    };
    fetchParkingList();
  }, []);
  console.log(parkingList);

  return (
    <MainTemplate>
      <LoadingIndicator promise={promise}>
        <div className="wrap-parking-list">
          <span className="title-parking-list">Reservation:</span>
          <ul className="list-group">
            {parkingList &&
              parkingList.result.map(parking => {
                const amountParkingSpots = parking.parkingSpots.length;

                return (
                  <li key={parking.id} className="list-group-item disabled parking-list-li">
                    <span className="parking-list-data">{`${parking.name} ${parking.address}`}</span>
                    <span className="badge badge-primary badge-pill parking-list-amount-parking-spot">
                      {amountParkingSpots}
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      </LoadingIndicator>
    </MainTemplate>
  );
};
export default Reservation;
