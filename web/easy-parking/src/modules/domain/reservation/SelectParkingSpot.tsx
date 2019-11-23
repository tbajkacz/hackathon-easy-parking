import React, { useEffect, useState } from "react";
import MainTemplate from "../../../templates/MainTemplate";
import LoadingIndicator from "../../../utils/LoadingIndicator";
import reservationService from "./reservationService";
import { useParams } from "react-router";
import { ParkingList } from "./reservationTypes";
import { ApiResponse } from "../../../common/types";
import "./SelectParkingSpot.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";
import { FormGroup, Label, Input } from "reactstrap";

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

  const handleChangeSelectSpot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const valueNum = Number(value);
    setSelectSpot(valueNum);
  };

  const [startDate, setStartDate] = useState<Date | null>(setHours(setMinutes(new Date(), 30), 16));

  console.log(startDate);

  return (
    <MainTemplate>
      <LoadingIndicator promise={promise}>
        <>
          {selectParking && (
            <span className="title-parking-list">{`${selectParking.result.name}, ${selectParking.result.address}`}</span>
          )}
          <img
            src={selectParking ? selectParking.result.parkingLayoutImageData : ""}
            alt="autos"
            className="selectParkingImage"
          />
          <FormGroup>
            <Label for="exampleSelect">Select parking spot:</Label>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              value={selectSpot}
              onChange={e => handleChangeSelectSpot(e)}
            >
              {selectParking &&
                selectParking.result.parkingSpots.map(spot => <option key={spot.id}>{spot.spotNumber}</option>)}
            </Input>
          </FormGroup>

          <div>From</div>
          <DatePicker
            // className={classes.datePickerInput}
            selected={startDate}
            onChange={date => setStartDate(date)}
            showTimeSelect
            excludeTimes={[
              setHours(setMinutes(new Date(), 0), 17),
              setHours(setMinutes(new Date(), 30), 18),
              setHours(setMinutes(new Date(), 30), 19),
              setHours(setMinutes(new Date(), 30), 17)
            ]}
            dateFormat="MMMM d, yyyy h:mm aa"
          />

          <div>To</div>
          <DatePicker
            // className={classes.datePickerInput}
            selected={startDate}
            onChange={date => setStartDate(date)}
            showTimeSelect
            excludeTimes={[
              setHours(setMinutes(new Date(), 0), 17),
              setHours(setMinutes(new Date(), 30), 18),
              setHours(setMinutes(new Date(), 30), 19),
              setHours(setMinutes(new Date(), 30), 17)
            ]}
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </>
      </LoadingIndicator>
    </MainTemplate>
  );
};
export default SelectParkingSpot;
