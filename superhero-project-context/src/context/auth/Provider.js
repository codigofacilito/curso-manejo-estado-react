import AuthContext from "./index";
import { useCallback } from "react";

export default function AuthProvider({ children }) {
  const handleLogin = useCallback(async (name, email) => {
    localStorage.setItem("@superhero-isAuth", "true");
    localStorage.setItem("@superhero-data", JSON.stringify({
      name,
      email
    }));
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated: localStorage.getItem("@superhero-isAuth")?.length > 0,
      onLogin: handleLogin,
    }}>
      {children}
    </AuthContext.Provider>
  );
}