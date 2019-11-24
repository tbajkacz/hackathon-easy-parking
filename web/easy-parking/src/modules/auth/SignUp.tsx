import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { routes } from "../../routes";
import logoSignIn from "../../assets/img/icon-lock.svg";
import { useAuth } from "./authContext";
import { SignUpCredentials } from "./authTypes";

interface SignUpProps {}
const initSignUpData = {
  name: "",
  surname: "",
  email: "",
  login: "",
  password: ""
};
const SignUp: React.FC<SignUpProps> = props => {
  const { signUp, currentUser } = useAuth();
  const [signUpData, setSignUpData] = useState<SignUpCredentials>(initSignUpData);

  const handleChangeSignUp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setSignUpData({
      ...signUpData,
      [name]: value
    });
  };

  const handlePostSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(signUpData);
  };

  if (currentUser) {
    return <Redirect to={routes.reservation} />;
  }

  return (
    <div className="container-main">
      <form className="wrap-form" onSubmit={e => handlePostSignUp(e)}>
        <div className="avatar">
          <img src={logoSignIn} alt="sign in" className="logo-signIn" />
          <span className="logo-subtitle">Sign Up</span>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
            autoFocus
            onChange={e => handleChangeSignUp(e)}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Surname"
            name="surname"
            onChange={e => handleChangeSignUp(e)}
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            onChange={e => handleChangeSignUp(e)}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Login"
            name="login"
            onChange={e => handleChangeSignUp(e)}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            onChange={e => handleChangeSignUp(e)}
          />
        </div>
        <div className="wrap-buttons">
          <button type="submit" className="btn btn-primary btn-signIn">
            Sign Up
          </button>
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
