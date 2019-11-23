import React, { useState } from "react";
import { AddParkingLotData } from "./parkingsTypes";
import { imageUtility } from "../../../common/imageUtility";
import MainTemplate from "../../../templates/MainTemplate";
import { parkingService } from "./parkingService";

interface AddParkingLotProps {}

const defaultParkingLotValues: AddParkingLotData = {
  name: "",
  address: "",
  pricePerHour: 0,
  parkingSpotsAmount: 0,
  parkingLayoutImageData: ""
};

const AddParkingLot: React.FC<AddParkingLotProps> = props => {
  const [addParkingLotData, setAddParkingLotData] = useState(defaultParkingLotValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddParkingLotData({
      ...addParkingLotData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setAddParkingLotData({
        ...addParkingLotData,
        parkingLayoutImageData: await imageUtility.toBase64(e.currentTarget.files[0])
      });
    }
  };

  const onFormSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    parkingService.Add(addParkingLotData);
  };

  return (
    <MainTemplate>
      <form className="col-sm-12 col-md-4 offset-md-4 mt-2">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
            autoFocus
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            name="address"
            autoFocus
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            placeholder="Price per hour"
            name="pricePerHour"
            autoFocus
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            placeholder="Parking spots count"
            name="parkingSpotsAmount"
            autoFocus
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            className=""
            placeholder="Image"
            name="image"
            autoFocus
            onChange={e => handleFileChange(e)}
          />
        </div>
        <button className="btn btn-primary btn-block" onClick={onFormSubmit}>
          Add
        </button>
      </form>
    </MainTemplate>
  );
};

export default AddParkingLot;
