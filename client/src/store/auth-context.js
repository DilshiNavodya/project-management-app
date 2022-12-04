import React, { useState, useEffect } from "react";
import apiClient from '../services/ApiClient'

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  userid: null,
});

const isLoggedIn = async () => {
    try {
    const data = await apiClient.isLoggedIn();
      console.log(data)
      if (data !== null) {
        return data
      }
    } catch (error) {
      console.log(error);
    }
}
const getUID = async () => {
  try {
    const {dataresponse, error} = await apiClient.getuser();
    return dataresponse.result
  } catch (error) {
    return null
  }
}

export const AuthContextProvider = (props) => {
    const tokenData = isLoggedIn()
    console.log(tokenData)
    const uid = getUID()

    const [isAuthenticated, setIsAuthenticated] = useState(tokenData);
    const [userid, setuserid] = useState(uid)

    const loginHandler = () => {
        setIsAuthenticated(true)
    }

    const logoutHandler = () => {
        setIsAuthenticated(false)
    }

  const contextValue = {
    isLoggedIn: isAuthenticated,
    login: loginHandler,
    logout: logoutHandler,
    userid: userid,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;