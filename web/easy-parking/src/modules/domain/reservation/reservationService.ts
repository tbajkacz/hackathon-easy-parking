import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "../../../common/types";
import { ParkingList } from "./reservationTypes";
import { unwrap } from "../../../common/serviceUtility";

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

const reservationService = {
  getAllParking,
  getParkingById
};

export default reservationService;
