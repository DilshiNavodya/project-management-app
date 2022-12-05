import React, { useState, useEffect } from "react";
import apiClient from "../services/ApiClient";

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  uid: null
});

export const AuthContextProvider = (props) => {
  const [userid, setUserid] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(()=> {
    const getuid = async () => {
      const {dataresponse, error} = await apiClient.getuser();
      setUserid(dataresponse.result)
    }
    const data = localStorage.getItem('token');
      if (data !== null) {
        setIsAuthenticated(true)
        getuid()
      } else {
        setIsAuthenticated(false)
      }
  },[])
    const loginHandler = async () => {
        setIsAuthenticated(true)
        const {dataresponse, error} = await apiClient.getuser();
        setUserid(dataresponse.result)
    }

    const logoutHandler = () => {
        setIsAuthenticated(false)
        setUserid(null)
    }

  const contextValue = {
    isLoggedIn: isAuthenticated,
    login: loginHandler,
    logout: logoutHandler,
    uid: userid
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;