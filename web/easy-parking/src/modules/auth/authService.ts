import axios from "axios";
import { UserAccount, SignInCredentials, SignUpCredentials } from "./authTypes";
import { unwrap } from "../../common/serviceUtility";
import { ApiResponse } from "../../common/types";

const signIn = (params?: SignInCredentials): Promise<ApiResponse<UserAccount>> => {
  return axios.post<ApiResponse<UserAccount>>("auth/SignIn", params).then(unwrap);
};

const signUp = (params?: SignUpCredentials): Promise<ApiResponse<UserAccount>> => {
  return axios.post<ApiResponse<UserAccount>>("auth/Register", params).then(unwrap);
};

const signOut = () => {
  return axios.get<ApiResponse<undefined>>("auth/SignOut").then(unwrap);
};

const getCurrentUser = (): Promise<ApiResponse<UserAccount>> => {
  return axios.get<ApiResponse<UserAccount>>("auth/GetCurrentUser").then(unwrap);
};

const authService = {
  signIn,
  signUp,
  signOut,
  getCurrentUser
};

export default authService;
