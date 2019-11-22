import axios from "axios";
import { CurrentUser, SignInCredentials, SignUpCredentials } from "./authTypes";
import { unwrap } from "../../common/serviceUtility";
import { ApiResponse } from "../../common/types";

const signIn = (params?: SignInCredentials): Promise<ApiResponse<CurrentUser>> => {
  return axios.post<ApiResponse<CurrentUser>>("auth/SignIn", params).then(unwrap);
};

const signUp = (params?: SignUpCredentials): Promise<ApiResponse<CurrentUser>> => {
  return axios.post<ApiResponse<CurrentUser>>("auth/Register", params).then(unwrap);
};

const signOut = () => {
  return axios.get<ApiResponse<undefined>>("auth/SignOut").then(unwrap);
};

const getCurrentUser = (): Promise<ApiResponse<CurrentUser>> => {
  return axios.get<ApiResponse<CurrentUser>>("auth/GetCurrentUser").then(unwrap);
};

const authService = {
  signIn,
  signUp,
  signOut,
  getCurrentUser
};

export default authService;
