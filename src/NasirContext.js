import React, { createContext } from "react";
import { getToken } from "./AuthProvider";

export const NasirContext = createContext();

// #######  CONSTANT  SECTION
const ADMIN = "CHECK_ADMIN";
const LOGOUT = "LOGOUT";
const LOGIN = "LOGIN";
const GET_ADMIN = "GET_ADMIN";
const SET_SECTION = "SET_SECTION";
const REMOVE_SECTION = "REMOVE_SECTION";
// ##################  Reducer Section

//  admin reducer for handling token
function AdminReducer(state, action) {
  if (action.type === ADMIN) {
    return (state = action.payload);
  }
  if (action.type === LOGOUT) {
    return (state = action.payload);
  }
  if (action.type === LOGIN) {
    return;
  }

  return state;
}

// user reducer for handling user data
function userReducer(state, action) {
  if (action.type === GET_ADMIN) {
    return (state = action.payload);
  }
}

//section reducer
function sectionReducer(state, action) {
  if (action.type === SET_SECTION) {
    return (state = getToken("section"));
  }
  if (action.type === REMOVE_SECTION) {
    return (state = action.payload);
  }
}

// #################### Context Provider
export function NasirProvider({ children }) {
  const [token, dispatch] = React.useReducer(AdminReducer, getToken("token"));
  const [admin, dispatchAdmin] = React.useReducer(userReducer, null);
  const [section, dispatchSection] = React.useReducer(
    sectionReducer, 
    getToken("section")
  );

  const logout = React.useCallback(() => {
    dispatch({ type: LOGOUT, payload: false }, dispatch);
  }, []);

  const login = React.useCallback(() => {
    dispatch({ type: ADMIN, payload: getToken("token") }, dispatch);
  }, []);

  const setAdmin = React.useCallback((admin) => {
    dispatchAdmin({ type: GET_ADMIN, payload: admin });
  }, []);

  const selectSection = React.useCallback(() => {
    dispatchSection({ type: REMOVE_SECTION, payload: null });
  }, []);

  const changeSection = React.useCallback(() => {
    dispatchSection(
      { type: REMOVE_SECTION, payload: getToken("section") },
      dispatchSection
    );
  }, []);

  const value = {
    token,
    logout,
    login,
    admin,
    selectSection,
    changeSection,
    section,
    setAdmin,
  };

  return (
    <NasirContext.Provider value={value}>{children}</NasirContext.Provider>
  );
}