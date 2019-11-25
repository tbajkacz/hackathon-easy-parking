import React, { useEffect, useState } from "react";
import MainTemplate from "../../../templates/MainTemplate";
import LoadingIndicator from "../../../utils/LoadingIndicator";
import reservationService from "./reservationService";
import { useParams, useHistory } from "react-router";
import { Parking, ReserveData, SpotExclude } from "./reservationTypes";
import { ApiResponse } from "../../../common/types";
import "./SelectParkingSpot.scss";
import { Input } from "reactstrap";
import { roundedDate, roundedDataPlusHalfHour } from "../../../utils/roundedDate";
import { routes } from "../../../routes";
import SectionName from "../../../common/SectionName";
import { formatDate } from "../../../utils/formatDate";
import DatePickerCalendar from "../../../common/DatePickerCalendar";
import SelectInputParkingSpot from "./SelectInputParkingSpot";

interface SelectParkingSpotProps {}

const defaultReserveData = {
  from: roundedDate(30).toISOString(),
  to: roundedDataPlusHalfHour().toISOString(),
  parkingId: 0,
  spotNumber: 0,
  vehicleRegistrationNumber: ""
};

const SelectParkingSpot: React.FC<SelectParkingSpotProps> = props => {
  const { parkingId } = useParams();
  const history = useHistory();
  const [promise, setPromise] = useState<Promise<any> | undefined>(undefined);
  const [selectParking, setSelectParking] = useState<ApiResponse<Parking>>();

  useEffect(() => {
    const fetchParkingById = async () => {
      const id = Number(parkingId);
      const promise = reservationService.getParkingById(id);
      setPromise(promise);
      const res = await promise;
      setSelectParking(res);
    };
    fetchParkingById();
  }, []);

  const [startDate, setStartDate] = useState<Date | null>(roundedDate(30));
  const [endDate, setEndDate] = useState<Date | null>(roundedDataPlusHalfHour());
  const [reserveData, setReserveData] = useState<ReserveData>(defaultReserveData);
  const [selectSpot, setSelectSpot] = useState<number>(0);
  const [vehicleRegistration, setVehicleRegistration] = useState<string>("");

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
      const dateFormatting = date.toISOString();
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
    }
  };

  const handleVehicleRegistrationNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehicleRegistration(e.target.value);
    setReserveData({
      ...reserveData,
      [e.target.name]: e.target.value
    });
  };

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
      selectParking.result.parkingSpots
        .map(p => ({ reservations: p.reservations, spotNumber: p.spotNumber }))
        .filter(r => r.reservations.length !== 0)
        .flatMap(o => o.reservations.map(r => ({ untilUtc: r.untilUtc, fromUtc: r.fromUtc, spotNumber: o.spotNumber })))
        .forEach(r => {
          let startingDate = new Date(r.fromUtc);
          let endingDate = new Date(r.untilUtc);
          endingDate.setMinutes(endingDate.getMinutes() - 1);
          do {
            excludeCollection.push({ spotNumber: r.spotNumber, exclude: new Date(startingDate.toISOString()) });
            startingDate.setMinutes(startingDate.getMinutes() + 30);
          } while (startingDate < endingDate);
        });
      setTimeExcludeCollection(excludeCollection);
    }
  };

  const isDisabledByDate = () => {
    if (startDate && endDate && dayBasedExcludeCollection) {
      return (
        dayBasedExcludeCollection.filter(
          c =>
            formatDate(c, "YYYYMMDDHHmm") === formatDate(startDate, "YYYYMMDDHHmm") ||
            formatDate(c, "YYYYMMDDHHmm") === formatDate(endDate, "YYYYMMDDHHmm")
        ).length !== 0
      );
      return dayBasedExcludeCollection.filter(c => startDate <= c && endDate > c).length !== 0;

    }
    return false;
  };

  return (
    <MainTemplate>
      <LoadingIndicator promise={promise}>
        <>
          {selectParking && (
            <SectionName>{`${selectParking.result.name}, ${selectParking.result.address}`}</SectionName>
          )}
          <img
            src={selectParking ? selectParking.result.parkingLayoutImageData : ""}
            alt="place parking"
            className="selectParkingImage"
          />
          <div className="wrap-form-parking-spot">
            <SelectInputParkingSpot
              selectParking={selectParking}
              handleChangeSelectSpot={handleChangeSelectSpot}
              updateTimeExcludes={updateTimeExcludes}
            />
            <div className="pl-3">From</div>
            <DatePickerCalendar
              defaultDate={startDate}
              name="from"
              handleDatePicker={handleDatePicker}
              excludeTimes={dayBasedExcludeCollection}
            />
            <div className="pl-3">To</div>
            <DatePickerCalendar
              defaultDate={endDate}
              name="to"
              handleDatePicker={handleDatePicker}
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
