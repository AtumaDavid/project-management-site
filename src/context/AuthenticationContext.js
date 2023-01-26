import { createContext, useEffect, useReducer } from "react";
import { projectAuthentication } from "../firebase/config";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    //reducer handles the logout/signout to update state to null
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true }; //"AUTH_IS_READY" checks if the user is already logged in so when we refresh the page, the user stays logged in
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    //to check in fire base if we have a user currently logged in.
    //if we have a user, we become the user, if not the user stays at null(user: null) then "authIsReady becomes true"
    authIsReady: false,
  });

  useEffect(() => {
    // onAuthStateChanged
    const unsub = projectAuthentication.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
