import React, { useState } from "react";
import "./SignIn.scss";
import { NavLink, Redirect } from "react-router-dom";
import { routes } from "../../routes";
import logoSignIn from "../../assets/img/icon-lock.svg";
import { SignInCredentials } from "./authTypes";
import { useAuth } from "./authContext";
import authService from "./authService";

interface SignInProps {}

const SignIn: React.FC<SignInProps> = props => {
  const { signIn, currentUser } = useAuth();
  const [signInData, setSignInData] = useState<SignInCredentials>({
    login: "",
    password: "",
    rememberMe: true
  });

  const handleChangeSignIn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setSignInData({ ...signInData, [name]: value });
  };

  const handlePostSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(signInData);
  };
  if (currentUser) {
    return <Redirect to={routes.main} />;
  }
  return (
    <div className="container-main">
      <form className="wrap-form" onSubmit={e => handlePostSignIn(e)}>
        <div className="form-group">
          <div className="avatar">
            <img src={logoSignIn} alt="sign in" className="logo-signIn" />
            <span className="logo-subtitle">Sign In</span>
          </div>
          <input
            type="input"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Login"
            autoFocus
            name="login"
            onChange={e => handleChangeSignIn(e)}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            onChange={e => handleChangeSignIn(e)}
          />
        </div>

        <div className="wrap-buttons">
          <button type="submit" className="btn btn-primary btn-signIn">
            Sign In
          </button>

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
