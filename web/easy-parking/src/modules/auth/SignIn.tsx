import React, { useState } from "react";
import "./SignIn.scss";
import { NavLink } from "react-router-dom";
import { routes } from "../../routes";
import logoSignIn from "../../assets/img/icon-lock.svg";
import { SignInCredentials } from "./authTypes";

interface SignInProps {}

const SignIn: React.FC<SignInProps> = props => {
  const [signInData, setSignInData] = useState<SignInCredentials>({
    email: "",
    password: ""
  });

  const handleSignIn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setSignInData({ ...signInData, [name]: value });
  };

  return (
    <div className="container-main">
      <form className="wrap-form">
        <div className="form-group">
          <div className="avatar">
            <img src={logoSignIn} alt="sign in" className="logo-signIn" />
            <span className="logo-subtitle">Sign In</span>
          </div>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
            autoFocus
            name="email"
            onChange={e => handleSignIn(e)}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            onChange={e => handleSignIn(e)}
          />
        </div>

        <div className="wrap-buttons">
          <NavLink to={routes.main}>
            <button type="submit" className="btn btn-primary btn-signIn">
              Sign In
            </button>
          </NavLink>
          <NavLink to={routes.register} className="link-to-sign-up">
            {" "}
            Don't have an account? Sign Up
          </NavLink>
        </div>
      </form>
    </div>
  );
};
export default SignIn;
