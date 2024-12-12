import { createContext, ReactNode, useContext, useState } from "react";
import User from "../types/User";

type AuthState = {
  authUser: User | null;
  setAuthUser: React.Dispatch<any>;
};

export const AuthContext = createContext({} as AuthState);

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [authUser, setAuthUser] = useState(
    (JSON.parse(localStorage.getItem("chat-user")!) as User) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}
