import axios from "axios";
import { ApiResponse } from "../../../common/types";
import { Parking, ReserveData } from "./reservationTypes";
import { unwrap } from "../../../common/serviceUnwrapUtility";
import { UserAccount } from "../../auth/authTypes";

const getAllParking = (): Promise<ApiResponse<Parking[]>> => {
  return axios.get<ApiResponse<Parking[]>>("parking/GetAll").then(unwrap);
};

const getParkingById = (id: number): Promise<ApiResponse<Parking>> => {
  return axios
    .get<ApiResponse<Parking>>("parking/getById", {
      params: {
        id
      }
    })
    .then(unwrap);
};

const sendReserve = (reserveData: ReserveData): Promise<ApiResponse<UserAccount>> => {
  return axios.post<ApiResponse<UserAccount>>("Reservations/Reserve", reserveData).then(unwrap);
};

const reservationService = {
  getAllParking,
  getParkingById,
  sendReserve
};

export default reservationService;
