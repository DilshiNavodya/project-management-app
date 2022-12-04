import React from "react";
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';
import apiClient from '../services/ApiClient';
import { Link, useNavigate } from 'react-router-dom';

const AuthPage = () => {

  return (
   <Login/>
  );
};

export default AuthPage;