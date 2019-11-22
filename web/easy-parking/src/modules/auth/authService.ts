import axios, { AxiosPromise } from "axios";
import { CurrentUser, SignInCredentials } from "./authTypes";

const signIn = (params?: SignInCredentials): AxiosPromise<CurrentUser> => {
  return axios.post<CurrentUser>("http://localhost:5000/auth/signIn", {
    params
  });
};

const signUp = (): AxiosPromise<CurrentUser> => {
  return axios.post<CurrentUser>("http://localhost:5000/auth/signUp");
};

const signOut = () => {
  return axios.post("");
};

const getCurrentUser = (): AxiosPromise<CurrentUser> => {
  return axios.get<CurrentUser>("http://...");
};

const authService = {
  signIn,
  signUp,
  signOut,
  getCurrentUser
};

export default authService;
