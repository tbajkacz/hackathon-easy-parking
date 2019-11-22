import axios from "axios";
import { CurrentUser, SignInCredentials } from "./authTypes";
import { unwrap } from "../../common/serviceUtility";
import { ApiResponse } from "../../common/types";

const signIn = (
  params?: SignInCredentials
): Promise<ApiResponse<CurrentUser>> => {
  return axios
    .post<ApiResponse<CurrentUser>>("auth/SignIn", {
      params
    })
    .then(unwrap);
};

const signUp = (): Promise<ApiResponse<CurrentUser>> => {
  return axios.post<ApiResponse<CurrentUser>>("auth/Register").then(unwrap);
};

const signOut = () => {
  return axios.post<ApiResponse<undefined>>("auth/SignOut").then(unwrap);
};

const getCurrentUser = (): Promise<ApiResponse<CurrentUser>> => {
  return axios
    .get<ApiResponse<CurrentUser>>("auth/GetCurrentUser")
    .then(unwrap);
};

const authService = {
  signIn,
  signUp,
  signOut,
  getCurrentUser
};

export default authService;
