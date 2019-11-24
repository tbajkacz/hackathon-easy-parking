import React from "react";
import "./App.scss";
import { ProvideAuth } from "./modules/auth/authContext";
import { Switch, Route, HashRouter } from "react-router-dom";
import { routes } from "./routes";
import SignIn from "./modules/auth/SignIn";
import SignUp from "./modules/auth/SignUp";
import Reservation from "./modules/domain/reservation/Reservation";
import SelectParkingSpot from "./modules/domain/reservation/SelectParkingSpot";
import AddParkingLot from "./modules/domain/parkings/AddParkingLot";
import UserReservationList from "./modules/domain/userReservations/UserReservationList";

const App: React.FC = () => {
  return (
    <ProvideAuth>
      <HashRouter>
        <Switch>
          <Route exact path={routes.login} component={SignIn} />
          <Route exact path={routes.register} component={SignUp} />
          <Route exact path={routes.reservation} component={Reservation} />
          <Route exact path={routes.viewReservations} component={UserReservationList} />
          <Route exact path={routes.addParking} component={AddParkingLot} />
          <Route exact path={routes.selectParkingSpot} component={SelectParkingSpot} />
        </Switch>
      </HashRouter>
    </ProvideAuth>
  );
};

export default App;
