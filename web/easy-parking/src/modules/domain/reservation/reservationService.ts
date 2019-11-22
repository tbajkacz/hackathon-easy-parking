import axios from "axios";
import { ApiResponse } from "../../../common/types";
import { ParkingList } from "./reservationTypes";
import { unwrap } from "../../../common/serviceUtility";

const getAllParking = (): Promise<ApiResponse<ParkingList[]>> => {
  return axios.get<ApiResponse<ParkingList[]>>("parking/GetAll").then(unwrap);
};

const reservationService = {
  getAllParking
};

export default reservationService;
