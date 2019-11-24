import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "../../../common/types";
import { Parking, ReserveData } from "./reservationTypes";
import { unwrap } from "../../../common/serviceUtility";
import { UserAccount } from "../../auth/authTypes";

const getAllParking = (): Promise<ApiResponse<Parking[]>> => {
  return axios.get<ApiResponse<Parking[]>>("parking/GetAll").then(unwrap);
};

const getParkingById = (id: number): Promise<AxiosResponse<ApiResponse<Parking>>> => {
  return axios.get<ApiResponse<Parking>>("parking/getById", {
    params: {
      id
    }
  });
};

const sendReserve = (reserveData: ReserveData): Promise<AxiosResponse<ApiResponse<UserAccount>>> => {
  return axios.post<ApiResponse<UserAccount>>("Reservations/Reserve", reserveData);
};

const reservationService = {
  getAllParking,
  getParkingById,
  sendReserve
};

export default reservationService;
