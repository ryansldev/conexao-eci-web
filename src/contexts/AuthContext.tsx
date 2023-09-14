import { localStorageKeys } from "@/config/localStorageKeys";
import { createContext, useCallback, useState } from "react";

interface AuthContextValue {
  signedIn: boolean;
  signin(accessToken: string): void;
  signout(): void;
  token: string | null;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState(
    localStorage.getItem(localStorageKeys.ACCESS_TOKEN)
  );

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setToken(accessToken);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn: !!token, signin, signout, token }}>
      {children}
    </AuthContext.Provider>
  );
}
