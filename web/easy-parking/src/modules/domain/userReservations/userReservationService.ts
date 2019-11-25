import { UserReservation } from "./userReservationTypes";
import { ApiResponse } from "./../../../common/types";
import axios from "axios";
import { unwrap } from "../../../common/serviceUnwrapUtility";

const get = () => {
  return axios.get<ApiResponse<UserReservation[]>>("Reservations/GetUserReservations").then(unwrap);
};

const deleteReservation = (id: number) => {
  return axios
    .post<ApiResponse<any>>("Reservations/CancelReservation", { ReservationId: id })
    .then(unwrap);
};

const userReservationService = {
  get,
  deleteReservation
};

export default userReservationService;
