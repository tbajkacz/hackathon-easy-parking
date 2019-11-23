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

interface SpotExclude {
  spotNumber: number;
  exclude: Date;
}

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
            dateFormat="MMMM d, yyyy h:mm aa"
          />

          <div>To</div>
          <DatePicker
            className="date-picker"
            selected={endDate}
            name="to"
            onChange={date => handleDatePicker(date, "to")}
            showTimeSelect
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
