
import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      console.log("Reducer LOGIN_START");
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      console.log("Reducer LOGIN_SUCCESS:", action.payload);
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      console.log("Reducer LOGIN_FAILURE:", action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{
      user: state.user,
      loading: state.loading,
      error: state.error,
      dispatch,
    }}>
      {children}
    </AuthContext.Provider>
  );
};