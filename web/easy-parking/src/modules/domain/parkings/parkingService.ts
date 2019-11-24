import { AddParkingLotData } from "./parkingsTypes";
import Axios from "axios";
import { ApiResponse } from "../../../common/types";
import { unwrap } from "../../../common/serviceUnwrapUtility";

const add = (param: AddParkingLotData) => {
  return Axios.post<ApiResponse<any>>("parking/add", {
    name: param.name,
    address: param.address,
    pricePerHour: Number(param.pricePerHour),
    parkingSpotsAmount: Number(param.parkingSpotsAmount),
    parkingLayoutImageData: param.parkingLayoutImageData
  }).then(unwrap);
};

const parkingService = {
  add
};

export default parkingService;
