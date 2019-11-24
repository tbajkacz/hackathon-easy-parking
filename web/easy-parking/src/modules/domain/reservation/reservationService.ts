import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "../../../common/types";
import { ParkingList, ReserveData } from "./reservationTypes";
import { unwrap } from "../../../common/serviceUtility";
import { UserAccount } from "../../auth/authTypes";

const getAllParking = (): Promise<ApiResponse<ParkingList[]>> => {
  return axios.get<ApiResponse<ParkingList[]>>("parking/GetAll").then(unwrap);
};

const getParkingById = (id: number): Promise<AxiosResponse<ApiResponse<ParkingList>>> => {
  return axios.get<ApiResponse<ParkingList>>("parking/getById", {
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
