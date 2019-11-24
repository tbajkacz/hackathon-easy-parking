import React, { useState, useEffect } from "react";
import { UserReservation } from "./userReservationTypes";
import { userReservationService } from "./userReservationService";
import LoadingIndicator from "../../../utils/LoadingIndicator";
import MainTemplate from "../../../templates/MainTemplate";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCalendarTimes } from "@fortawesome/free-solid-svg-icons";
import "./UserReservationList.scss";
import SectionName from "../../../common/SectionName";

interface UserReservationListProps {}

const dateFormat = "HH:mm DD.MM.YY";

const UserReservationList: React.FC<UserReservationListProps> = props => {
  const [loadingPromise, setLoadingPromise] = useState<Promise<any>>();
  const [userReservationList, setUserReservationList] = useState<UserReservation[]>();
  const [update, setUpdate] = useState(false);

  const cancelReservation = (id: number) => {
    userReservationService.Delete(id).then(() => setUpdate(!update));
  };

  useEffect(() => {
    setLoadingPromise(
      userReservationService.Get().then(response => {
        setUserReservationList(response.result);
      })
    );
  }, [update]);
  return (
    <MainTemplate>
      <LoadingIndicator promise={loadingPromise}>
        <div className="wrap-parking-list">
          <SectionName>Your reservations:</SectionName>
          <ul className="list-group">
            {userReservationList &&
              userReservationList.map(reservation => {
                return (
                  <li key={reservation.id} className="list-group-item parking-list-li">
                    <div className="d-flex">
                      <div className="w-100">
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
                      </div>
                      <div className="delete-wrapper">
                        <FontAwesomeIcon
                          className="delete-icon"
                          color="red"
                          icon={faCalendarTimes}
                          onClick={() => cancelReservation(reservation.id)}
                        />
                      </div>
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
