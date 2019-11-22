export interface UserAccount {
  id: number;
  name: string;
  surname: string;
  email: string;
  balance: number;
  login: string;
  roles: string[];
}

export interface SignInCredentials {
  login: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUpCredentials {
  name: string;
  surname: string;
  email: string;
  login: string;
  password: string;
}

export interface Auth {
  signIn: (params?: SignInCredentials) => void;
  signUp: (params?: SignUpCredentials) => void;
  signOut: () => void;
  currentUser?: UserAccount;
}
