import React from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../../routes";
import logoSignIn from "../../assets/img/icon-lock.svg";

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = props => {
  return (
    <div className="container-main">
      <form className="wrap-form">
        <div className="form-group">
          <div className="avatar">
            <img src={logoSignIn} alt="sign in" className="logo-signIn" />
            <span className="logo-subtitle">Sign Up</span>
          </div>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
            autoFocus
          />
        </div>

        <div className="form-group">
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <div className="wrap-buttons">
          <NavLink to={routes.main}>
            <button type="submit" className="btn btn-primary btn-signIn">
              Sign Up
            </button>
          </NavLink>
          <NavLink to={routes.login} className="link-to-sign-up">
            {" "}
            Already have an account? Sign in
          </NavLink>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
