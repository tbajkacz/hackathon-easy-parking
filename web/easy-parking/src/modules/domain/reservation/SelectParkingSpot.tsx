import React, { useEffect, useState } from "react";
import MainTemplate from "../../../templates/MainTemplate";
import LoadingIndicator from "../../../utils/LoadingIndicator";
import reservationService from "./reservationService";
import { useParams, useHistory } from "react-router";
import { Parking, ReserveData } from "./reservationTypes";
import { ApiResponse } from "../../../common/types";
import "./SelectParkingSpot.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";
import { FormGroup, Label, Input } from "reactstrap";
import { formatDate } from "../../../utils/formatDate";
import { roundedDate, roundedDataPlusHalfHour } from "../../../utils/roundedDate";
import { routes } from "../../../routes";
import moment from "moment";

interface SelectParkingSpotProps {}

interface SpotExclude {
  spotNumber: number;
  exclude: Date;
}

const SelectParkingSpot: React.FC<SelectParkingSpotProps> = props => {
  const { parkingId } = useParams();
  const [promise, setPromise] = useState<Promise<any> | undefined>(undefined);
  const [selectParking, setSelectParking] = useState<ApiResponse<Parking>>();
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
    if (date) {
      let filtered = timeExcludeCollection.filter(
        e => e.exclude.getDate() === date.getDate() && e.spotNumber === selectSpot
      );
      setDayBasedExcludeCollection(filtered.map(c => c.exclude));
    }
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
    from: roundedDate(30)
      .toISOString()
      .toString(),
    to: roundedDataPlusHalfHour()
      .toISOString()
      .toString(),
    parkingId: 0,
    spotNumber: 0,
    vehicleRegistrationNumber: ""
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

  const [timeExcludeCollection, setTimeExcludeCollection] = useState<SpotExclude[]>([]);
  const [dayBasedExcludeCollection, setDayBasedExcludeCollection] = useState<Date[]>();

  const updateTimeExcludes = () => {
    if (selectParking) {
      let excludeCollection: SpotExclude[] = [];
      console.log(
        selectParking.result.parkingSpots
          .map(p => ({ reservations: p.reservations, spotNumber: p.spotNumber }))
          .filter(r => r.reservations.length !== 0)
          .flatMap(o =>
            o.reservations.map(r => ({ untilUtc: r.untilUtc, fromUtc: r.fromUtc, spotNumber: o.spotNumber }))
          )
          .forEach(r => {
            let startingDate = new Date(r.fromUtc);
            let endingDate = new Date(r.untilUtc);
            endingDate.setMinutes(endingDate.getMinutes() - 1);
            do {
              excludeCollection.push({ spotNumber: r.spotNumber, exclude: new Date(startingDate.toISOString()) });
              startingDate.setMinutes(startingDate.getMinutes() + 30);
            } while (startingDate < endingDate);
          })
      );
      setTimeExcludeCollection(excludeCollection);
    }
  };
  console.log(reserveData);

  const isDisabledByDate = () => {
    if (startDate && endDate && dayBasedExcludeCollection) {
      return (
        dayBasedExcludeCollection.filter(
          c =>
            moment(c).format("YYYYMMDDHHmm") === moment(startDate).format("YYYYMMDDHHmm") ||
            moment(c).format("YYYYMMDDHHmm") === moment(endDate).format("YYYYMMDDHHmm")
        ).length !== 0
      );
    }
    return false;
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
          <div style={{ padding: "5px 10px" }}>
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
                  updateTimeExcludes();
                }}
              >
                <option value="0">Select parking spot</option>
                {selectParking &&
                  selectParking.result.parkingSpots.map(spot => <option key={spot.id}>{spot.spotNumber}</option>)}
              </Input>
            </FormGroup>

            <div className="pl-3">From</div>
            <DatePicker
              className="date-picker pl-3 mb-2"
              selected={startDate}
              name="from"
              onChange={date => handleDatePicker(date, "from")}
              onInputClick={() => {
                handleDatePicker(startDate, "from");
              }}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              excludeTimes={dayBasedExcludeCollection}
            />

            <div className="pl-3">To</div>
            <DatePicker
              className="date-picker pl-3 mb-2"
              selected={endDate}
              name="to"
              onChange={date => handleDatePicker(date, "to")}
              onInputClick={() => {
                handleDatePicker(endDate, "to");
              }}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              excludeTimes={dayBasedExcludeCollection}
            />

            <Input
              type="text"
              name="vehicleRegistrationNumber"
              className="my-2"
              placeholder="Vehicle registration number"
              onChange={e => handleVehicleRegistrationNumber(e)}
            />

            <button
              type="button"
              className="btn btn-primary w-100 mt-2 mb-5 btn-reserve-parking"
              onClick={() => handleSendReserve()}
              disabled={selectSpot === 0 || vehicleRegistration === "" || isDisabledByDate()}
            >
              {buttonContent}
            </button>
          </div>
        </>
      </LoadingIndicator>
    </MainTemplate>
  );
};
export default SelectParkingSpot;
