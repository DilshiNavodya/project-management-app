
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import React,{ Fragment, useContext, useEffect, useState } from "react";
import NavBar from "./components/UI/NavigationBar";
import apiClient from './services/ApiClient'
import Dashboard from "./pages/Dashboard";
import AuthContext from './store/auth-context';
import Header from "./components/UI/Header";
import Layout from "./components/UI/Layout";
import Projects from "./pages/Projects";
function App() {
  const authCtx = useContext(AuthContext)
  console.log(authCtx.isLoggedIn)
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/dashboard" element={authCtx.isLoggedIn ? <Dashboard/> : <Login/> }></Route>
        <Route path="/projects" element={authCtx.isLoggedIn ? <Projects/> : <Login/> }></Route>
      </Routes>
    </Layout>
  );
}

export default App;
