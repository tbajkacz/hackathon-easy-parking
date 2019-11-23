import React, { useState } from "react";
import "./MainTemplate.scss";
import { NavLink } from "react-router-dom";
import { routes } from "../routes";
import { useAuth } from "../modules/auth/authContext";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
interface MainTemplateProps {
  children: React.ReactNode;
}

const MainTemplate: React.FC<MainTemplateProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const { signOut } = useAuth();
  const handleSignOut = () => {
    signOut();
  };
  return (
    <>
      <Navbar color="faded" light className="nav-wrapper">
        <NavLink to={routes.reservation} className="mr-auto item-color">
          Easy Parking
        </NavLink>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem className="nav-item item-color">
              <NavLink to={routes.reservation} className="nav-link">
                <span className="nav-detail"> Reservation</span>
              </NavLink>
            </NavItem>
            <NavItem className="nav-item item-color">
              <NavLink to={routes.addParking} className="nav-link">
                <span className="nav-detail">Add parking lot</span>
              </NavLink>
            </NavItem>
            <NavItem className="nav-item">
              <NavLink to={routes.viewReservations} className="nav-link item-color">
                <span className="nav-detail">Your reservations</span>
              </NavLink>
            </NavItem>
            <NavItem className="nav-item">
              <NavLink to={routes.settings} className="nav-link item-color">
                <span className="nav-detail">Settings</span>
              </NavLink>
            </NavItem>
            <NavItem className="nav-item">
              <NavLink to={routes.login} className="nav-link item-color" onClick={() => handleSignOut()}>
                <span className="nav-detail">Sign Out</span>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>

      <div className="d-flex">{children}</div>
    </>
  );
};
export default MainTemplate;
