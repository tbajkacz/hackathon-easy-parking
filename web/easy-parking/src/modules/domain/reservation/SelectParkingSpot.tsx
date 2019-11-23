import React, { useEffect, useState } from "react";
import MainTemplate from "../../../templates/MainTemplate";
import LoadingIndicator from "../../../utils/LoadingIndicator";
import reservationService from "./reservationService";
import { useParams, useHistory } from "react-router";
import { ParkingList, ReserveData } from "./reservationTypes";
import { ApiResponse } from "../../../common/types";
import "./SelectParkingSpot.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";
import { FormGroup, Label, Input } from "reactstrap";
import { formatDate } from "../../../utils/formatDate";
import { routes } from "../../../routes";

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

  const [startDate, setStartDate] = useState<Date | null>(setHours(setMinutes(new Date(), 30), 16));
  const [endDate, setEndDate] = useState<Date | null>(setHours(setMinutes(new Date(), 30), 16));
  const [reserveData, setReserveData] = useState<ReserveData>({
    from: "",
    to: "",
    parkingId: 0,
    spotNumber: 0
  });

  const history = useHistory();

  const [buttonContent, setButtonContent] = useState("Reserve");
  const handleSendReserve = async () => {
    setPromise(
      reservationService.sendReserve(reserveData).then(
        () => {
          setButtonContent("Operation successfull !");
          setTimeout(() => history.push(routes.viewReservations), 1000);
        },
        () => setButtonContent("Error :( try again")
      )
    );
  };
  // console.log(startDate, endDate);
  console.log(reserveData, "--reserveData");
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
    console.log(flatSelectSpot, "flat");
  };

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
          <FormGroup>
            <Label for="exampleSelect">Select parking spot:</Label>
            <Input
              type="select"
              name="spotNumber"
              id="exampleSelect"
              value={selectSpot}
              onChange={e => {
                const selectParkingId = selectParking ? selectParking.result.id : 0;
                handleChangeSelectSpot(e, selectParkingId);
              }}
            >
              {selectParking &&
                selectParking.result.parkingSpots.map(spot => <option key={spot.id}>{spot.spotNumber}</option>)}
            </Input>
          </FormGroup>

          <div>From</div>
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

          <div>To</div>
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
          <button type="button" className="btn btn-primary w-100 mt-2" onClick={() => handleSendReserve()}>
            {buttonContent}
          </button>
        </>
      </LoadingIndicator>
    </MainTemplate>
  );
};
export default SelectParkingSpot;
