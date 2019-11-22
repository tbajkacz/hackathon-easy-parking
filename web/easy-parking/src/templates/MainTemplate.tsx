import React from "react";
import "./MainTemplate.scss";
import { NavLink } from "react-router-dom";
import { routes } from "../routes";
import iconSettings from "../assets/img/cog-solid.svg";

interface MainTemplateProps {
  children: React.ReactNode;
}

const MainTemplate: React.FC<MainTemplateProps> = ({ children }) => {
  return (
    <>
      {/*=== Top Menu =====*/}
      <nav className="navbar navbar-light border-bottom nav-wrapper">
        <NavLink to={routes.main} style={{ textDecoration: "none", padding: "10px" }}>
          <span className="navbar-buttons">Parking App</span>
        </NavLink>
        <NavLink
          to={routes.login}
          style={{ textDecoration: "none", padding: "10px", marginRight: "10px" }}
          className="btn-signOut"
        >
          <span className="navbar-buttons">Sign Out</span>
        </NavLink>
      </nav>

      {/* =====Sidebar===== */}
      <div className="d-flex">
        <div className="bg-light border-right sidebar-wrapper">
          <ul className="nav navbar-nav sidebar-ul">
            <NavLink to={routes.main} style={{ textDecoration: "none" }}>
              <li className="sidebar-li">
                <span className="sidebar-item">Reservation</span>
              </li>
            </NavLink>
            <NavLink to={routes.settings} style={{ textDecoration: "none" }}>
              <li className="sidebar-li">
                <img src={iconSettings} alt="settings" width="15px" className="icon-sidebar" />
                <span className="sidebar-item">Settings</span>
              </li>
            </NavLink>
          </ul>
        </div>
        {children}
      </div>
    </>
  );
};
export default MainTemplate;
