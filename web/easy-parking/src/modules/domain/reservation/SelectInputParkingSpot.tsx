import React from "react";
import { FormGroup, Input } from "reactstrap";
import { ApiResponse } from "../../../common/types";
import { Parking } from "./reservationTypes";

interface SelectInputParkingSpotProps {
  selectParking: ApiResponse<Parking> | undefined;
  handleChangeSelectSpot: (e: React.ChangeEvent<HTMLInputElement>, parkingId: number) => void;
  updateTimeExcludes: () => void;
}

const SelectInputParkingSpot: React.FC<SelectInputParkingSpotProps> = ({
  selectParking,
  handleChangeSelectSpot,
  updateTimeExcludes
}) => {
  return (
    <FormGroup className="mt-2">
      <Input
        type="select"
        name="spotNumber"
        placeholder="Select spot"
        onChange={e => {
          const selectParkingId = selectParking ? selectParking.result.id : 0;
          handleChangeSelectSpot(e, selectParkingId);
          updateTimeExcludes();
        }}
      >
        <option value="0">Select parking spot</option>
        {selectParking &&
          selectParking.result.parkingSpots.map(spot => <option key={spot.id}>{spot.spotNumber}</option>)}
      </Input>
    </FormGroup>
  );
};
export default SelectInputParkingSpot;
