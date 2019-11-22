export interface CurrentUser {
  username: string;
  email: string;
  password: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface Auth {
  signIn?: (params?: SignInCredentials) => void;
  signOut: () => void;
  currentUser?: CurrentUser;
}
