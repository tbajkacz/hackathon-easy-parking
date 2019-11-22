import React from "react";
import MainTemplate from "../../../templates/MainTemplate";
import "./Reservation.scss";

interface ReservationProps {}

const Reservation: React.FC<ReservationProps> = props => {
  return (
    <MainTemplate>
      <div className="wrap-parking-list">
        <span className="title-parking-list">Reservation:</span>
        <ul className="list-group">
          <li className="list-group-item disabled parking-list-li">Cras justo odio</li>
          <li className="list-group-item parking-list-li">Dapibus ac facilisis in</li>
          <li className="list-group-item parking-list-li">Morbi leo risus</li>
        </ul>
      </div>
    </MainTemplate>
  );
};
export default Reservation;
