import { UserReservation } from "./userReservationTypes";
import { ApiResponse } from "./../../../common/types";
import axios from "axios";
import { unwrap } from "../../../common/serviceUtility";

class UserReservationService {
  Get() {
    return axios.get<ApiResponse<UserReservation[]>>("Reservations/GetUserReservations").then(unwrap);
  }

  Delete(id: number) {
    return axios
      .post<ApiResponse<any>>("Reservations/CancelReservation", { ReservationId: id })
      .then(unwrap);
  }
}

export const userReservationService = new UserReservationService();
