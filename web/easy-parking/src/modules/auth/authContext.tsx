import React, { useContext, useEffect, useState } from "react";
import authService from "./authService";
import { SignInCredentials, CurrentUser, Auth, SignUpCredentials } from "./authTypes";
import LoadingIndicator from "../../utils/LoadingIndicator";

export const AuthContext = React.createContext<Auth>({
  signIn: () => null,
  signOut: () => null,
  signUp: () => null
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface ProvideAuthProps {
  children: React.ReactNode;
}

export function ProvideAuth(props: ProvideAuthProps) {
  const { Provider } = AuthContext;
  const { promise, ...auth } = useProvideAuth();
  return (
    <LoadingIndicator promise={promise}>
      <Provider value={auth}>{props.children}</Provider>
    </LoadingIndicator>
  );
}

export function useProvideAuth() {
  const [currentUser, setCurrentUser] = useState<CurrentUser>();
  const [promise, setPromise] = useState<Promise<any> | undefined>();

  const signIn = (params?: SignInCredentials) => {
    authService.signIn(params).then(r => {
      setPromise(
        authService.getCurrentUser().then(r => {
          setCurrentUser(r.result);
        })
      );
    });
  };

  const signUp = (params?: SignUpCredentials) => {
    let promise = authService.signUp(params).then(r => {
      signIn({ login: params!.login, password: params!.password, rememberMe: true });
    });
    setPromise(promise);
  };

  const signOut = () => {
    setPromise(authService.signOut());
    setCurrentUser(undefined);
  };

  useEffect(() => {
    setPromise(
      authService.getCurrentUser().then(user => {
        setCurrentUser(user.result);
      })
    );
  }, []);

  return { currentUser, signIn, signOut, promise, signUp };
}
