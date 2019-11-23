import { AddParkingLotData } from "./parkingsTypes";
import Axios from "axios";
import { ApiResponse } from "../../../common/types";
import { unwrap } from "../../../common/serviceUtility";

class ParkingService {
  Add(param: AddParkingLotData) {
    return Axios.post<ApiResponse<any>>("parking/add", {
      name: param.name,
      address: param.address,
      pricePerHour: Number(param.pricePerHour),
      parkingSpotsAmount: Number(param.parkingSpotsAmount),
      parkingLayoutImageData: param.parkingLayoutImageData
    }).then(unwrap);
  }
}

export const parkingService = new ParkingService();
