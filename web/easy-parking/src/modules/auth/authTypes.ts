export interface CurrentUser {
  username: string;
  email: string;
  password: string;
}

export interface SignInCredentials {
  login: string;
  password: string;
  rememberMe: boolean;
}

export interface Auth {
  signIn: (params?: SignInCredentials) => void;
  signOut: () => void;
  currentUser?: CurrentUser;
}
