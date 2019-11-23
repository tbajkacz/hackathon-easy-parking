import React, { useState, useEffect } from "react";
import { UserReservation } from "./userReservationTypes";
import { userReservationService } from "./userReservationService";
import LoadingIndicator from "../../../utils/LoadingIndicator";
import MainTemplate from "../../../templates/MainTemplate";
import moment from "moment";

interface UserReservationListProps {}

const dateFormat = "HH:mm DD.MM.YY";

const UserReservationList: React.FC<UserReservationListProps> = props => {
  const [loadingPromise, setLoadingPromise] = useState<Promise<any>>();
  const [userReservationList, setUserReservationList] = useState<UserReservation[]>();

  useEffect(() => {
    setLoadingPromise(
      userReservationService.Get().then(response => {
        setUserReservationList(response.result);
      })
    );
  }, []);
  return (
    <MainTemplate>
      <LoadingIndicator promise={loadingPromise}>
        <div className="wrap-parking-list">
          <span className="title-parking-list">Your reservations:</span>
          <ul className="list-group">
            {userReservationList &&
              userReservationList.map(reservation => {
                return (
                  <li key={reservation.id} className="list-group-item parking-list-li">
                    <h5 className="text-center">
                      {"Parking " +
                        reservation.reservedSpot.parking.name +
                        ", spot no. " +
                        reservation.reservedSpot.spotNumber}
                    </h5>
                    <div className="text-center">{"Reservation period:"}</div>
                    <div className="text-center">
                      {moment(reservation.fromUtc).format(dateFormat) +
                        " - " +
                        moment(reservation.untilUtc).format(dateFormat)}
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </LoadingIndicator>
    </MainTemplate>
  );
};

export default UserReservationList;
