import React from "react";
import "./App.scss";
import { ProvideAuth } from "./modules/auth/authContext";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import { routes } from "./routes";
import SignIn from "./modules/auth/SignIn";
import SignUp from "./modules/auth/SignUp";
import Reservation from "./modules/domain/reservation/Reservation";
import SettingsPanel from "./modules/domain/settingsPanel/SettingsPanel";
import SelectParkingSpot from "./modules/domain/reservation/SelectParkingSpot";

const App: React.FC = () => {
  return (
    <ProvideAuth>
      <HashRouter>
        <Switch>
          <Route exact path={routes.login} component={SignIn} />
          <Route exact path={routes.register} component={SignUp} />
          <Route exact path={routes.reservation} component={Reservation} />
          <Route exact path={routes.settings} component={SettingsPanel} />
          <Route exact path={routes.selectParkingSpot} component={SelectParkingSpot} />
          {/* <Redirect to={routes.login} /> */}
        </Switch>
      </HashRouter>
    </ProvideAuth>
  );
};

export default App;
