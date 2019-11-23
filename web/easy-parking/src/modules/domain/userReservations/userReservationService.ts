import { UserReservation } from "./userReservationTypes";
import { ApiResponse } from "./../../../common/types";
import axios from "axios";
import { unwrap } from "../../../common/serviceUtility";

class UserReservationService {
  Get() {
    return axios.get<ApiResponse<UserReservation[]>>("Reservations/GetUserReservations").then(unwrap);
  }
}

export const userReservationService = new UserReservationService();
