import React, { useEffect, useState } from "react";
import MainTemplate from "../../../templates/MainTemplate";
import LoadingIndicator from "../../../utils/LoadingIndicator";
import reservationService from "./reservationService";
import { useParams } from "react-router";
import { ParkingList, ReserveData } from "./reservationTypes";
import { ApiResponse } from "../../../common/types";
import "./SelectParkingSpot.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";
import { FormGroup, Label, Input } from "reactstrap";
import { formatDate } from "../../../utils/formatDate";
import { roundedDate, roundedDataPlusHalfHour } from "../../../utils/roundedDate";

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

  const [selectSpot, setSelectSpot] = useState<number>(0);
  const handleChangeSelectSpot = (e: React.ChangeEvent<HTMLInputElement>, parkingId: number) => {
    const value = e.target.value;
    const valueNum = Number(value);
    setSelectSpot(valueNum);
    setReserveData({
      ...reserveData,
      [e.target.name]: valueNum,
      parkingId
    });
  };

  const handleDatePicker = (date: Date | null, name: string) => {
    handleExcludeDate();
    const dateFormatting = date ? date.toISOString() : "";
    setReserveData({
      ...reserveData,
      [name]: dateFormatting
    });
    switch (name) {
      case "from":
        return setStartDate(date);
      case "to":
        return setEndDate(date);
    }
  };

  const [vehicleRegistration, setVehicleRegistration] = useState<string>("");
  const handleVehicleRegistrationNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehicleRegistration(e.target.value);
    setReserveData({
      ...reserveData,
      [e.target.name]: e.target.value
    });
  };

  const [startDate, setStartDate] = useState<Date | null>(roundedDate(30));
  const [endDate, setEndDate] = useState<Date | null>(roundedDataPlusHalfHour());
  const [reserveData, setReserveData] = useState<ReserveData>({
    from: roundedDate(30).toString(),
    to: roundedDataPlusHalfHour().toString(),
    parkingId: 0,
    spotNumber: 0,
    vehicleRegistrationNumber: ""
  });
  const handleSendReserve = async () => {
    const promise = reservationService.sendReserve(reserveData);
    setPromise(promise);
    const res = await promise;
    // console.log(res);
  };
  // console.log(startDate, endDate);
  // console.log(reserveData, "--reserveData");
  ///////////////

  const handleExcludeDate = () => {
    const mapSelectSpot =
      selectParking &&
      selectParking.result.parkingSpots.map(spot =>
        spot.reservations.map(reservation => {
          return { from: reservation.fromUtc, to: reservation.untilUtc };
        })
      );
    const flatSelectSpot = mapSelectSpot && mapSelectSpot.flat(1);

    // const flatSelectSpotFrom =
    //   mapSelectSpot &&
    //   mapSelectSpot.flat(1).map(x => {
    //     return new Date(x.from);
    //   });
    // const flatSelectSpotTo = mapSelectSpot && mapSelectSpot.flat(1).map(x => new Date(x.to));

    // const excludeData = flatSelectSpotFrom && flatSelectSpotTo && [...flatSelectSpotFrom, ...flatSelectSpotTo];
    // console.log(flatSelectSpot, "flat");
  };
  console.log(reserveData);

  return (
    <MainTemplate>
      <LoadingIndicator promise={promise}>
        <>
          {selectParking && (
            <span className="title-parking-list">{`${selectParking.result.name}, ${selectParking.result.address}`}</span>
          )}
          <img
            src={selectParking ? selectParking.result.parkingLayoutImageData : ""}
            alt="place parking"
            className="selectParkingImage"
          />
          <FormGroup className="mt-2">
            <Input
              type="select"
              name="spotNumber"
              id="exampleSelect"
              placeholder="Select spot"
              // value={selectSpot}
              onChange={e => {
                const selectParkingId = selectParking ? selectParking.result.id : 0;
                handleChangeSelectSpot(e, selectParkingId);
              }}
            >
              <option value="0">Select parking spot</option>
              {selectParking &&
                selectParking.result.parkingSpots.map(spot => <option key={spot.id}>{spot.spotNumber}</option>)}
            </Input>
          </FormGroup>

          <div className="pl-3">From</div>
          <DatePicker
            className="date-picker"
            selected={startDate}
            name="from"
            onChange={date => handleDatePicker(date, "from")}
            showTimeSelect
            // excludeTimes={[

            // setHours(setMinutes(new Date(), 0), 17),
            // setHours(setMinutes(new Date(), 30), 18),
            // setHours(setMinutes(new Date(), 30), 19),
            // setHours(setMinutes(new Date(), 30), 17)
            // ]}
            // excludeTimes={excludeData}
            dateFormat="MMMM d, yyyy h:mm aa"
          />

          <div className="pl-3">To</div>
          <DatePicker
            className="date-picker"
            selected={endDate}
            name="to"
            onChange={date => handleDatePicker(date, "to")}
            showTimeSelect
            excludeTimes={[
              setHours(setMinutes(new Date(), 0), 17),
              setHours(setMinutes(new Date(), 30), 18),
              setHours(setMinutes(new Date(), 30), 19),
              setHours(setMinutes(new Date(), 30), 17)
            ]}
            dateFormat="MMMM d, yyyy h:mm aa"
          />

          <Input
            type="text"
            name="vehicleRegistrationNumber"
            className="my-2 text-center"
            placeholder="Vehicle registration number"
            onChange={e => handleVehicleRegistrationNumber(e)}
          />

          <button
            type="button"
            className="btn btn-primary w-100 mt-2 mb-5 btn-reserve-parking"
            onClick={() => handleSendReserve()}
            disabled={selectSpot === 0 || vehicleRegistration === "" ? true : false}
          >
            Reserve parking
          </button>
        </>
      </LoadingIndicator>
    </MainTemplate>
  );
};
export default SelectParkingSpot;
