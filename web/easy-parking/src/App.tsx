import React from "react";
import "./App.scss";
import { ProvideAuth } from "./modules/auth/authContext";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import { routes } from "./routes";
import SignIn from "./modules/auth/SignIn";
import SignUp from "./modules/auth/SignUp";
import Reservation from "./modules/domain/reservation/Reservation";
import SettingsPanel from "./modules/domain/settingsPanel/SettingsPanel";

const App: React.FC = () => {
  return (
    <ProvideAuth>
      <HashRouter>
        <Switch>
          <Route path={routes.login} component={SignIn} />
          <Route path={routes.register} component={SignUp} />
          <Route exact path={routes.main} component={Reservation} />
          <Route exact path={routes.settings} component={SettingsPanel} />
          <Redirect to={routes.login} />
        </Switch>
      </HashRouter>
    </ProvideAuth>
  );
};

export default App;
