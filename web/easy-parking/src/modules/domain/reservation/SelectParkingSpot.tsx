import React, { useEffect, useState } from "react";
import MainTemplate from "../../../templates/MainTemplate";
import LoadingIndicator from "../../../utils/LoadingIndicator";
import reservationService from "./reservationService";
import { useParams } from "react-router";
import { ParkingList } from "./reservationTypes";
import { ApiResponse } from "../../../common/types";
import selectParkingImage from "../../../assets/img/autos.jpg";
import "./SelectParkingSpot.scss";

interface SelectParkingSpotProps {}

const SelectParkingSpot: React.FC<SelectParkingSpotProps> = props => {
  const { parkingId } = useParams();
  const [promise, setPromise] = useState<Promise<any> | undefined>(undefined);
  const [selectParking, setSelectParking] = useState<ApiResponse<ParkingList>>();
  useEffect(() => {
    const fetchParkingById = async () => {
      const id = Number(parkingId);
      const promise = reservationService.getParkingById(id);
      setPromise(promise);
      const res = await promise;
      setSelectParking(res.data);
    };
    fetchParkingById();
  }, []);

  const [selectSpot, setSelectSpot] = useState<number>(1);
  console.log(selectParking);

  const handleChangeSelectSpot = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const valueNum = Number(value);
    setSelectSpot(valueNum);
  };
  return (
    <MainTemplate>
      <LoadingIndicator promise={promise}>
        <div className="wrap-parking-list">
          {selectParking && (
            <span className="title-parking-list">{`${selectParking.result.name}, ${selectParking.result.address}`}</span>
          )}
          <img
            src={selectParking ? selectParking.result.parkingLayoutImageData : ""}
            alt="autos"
            className="selectParkingImage"
          />
          <div className="col-sm-10 col-md-6 offset-md-3">
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Select parking spot:</label>
              <select
                value={selectSpot}
                onChange={e => handleChangeSelectSpot(e)}
                className="form-control select-parking-spot"
                id="exampleFormControlSelect1"
              >
                {selectParking && selectParking.result.parkingSpots.map(spot => <option>{spot.spotNumber}</option>)}
              </select>
            </div>
          </div>
        </div>
      </LoadingIndicator>
    </MainTemplate>
  );
};
export default SelectParkingSpot;
