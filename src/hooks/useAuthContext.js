import { AuthContext } from "../context/AuthenticationContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be inside an AuthContextProvide");
  }

  return context;
};
