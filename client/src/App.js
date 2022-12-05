
import {  Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import React,{ useContext } from "react";
import Dashboard from "./pages/Dashboard";
import AuthContext from './store/auth-context';
import Layout from "./components/UI/Layout";
import Projects from "./pages/Projects";
function App() {
  const authCtx = useContext(AuthContext)
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={authCtx.isLoggedIn ? <Dashboard/> : <Login/> }></Route>
        <Route path="/projects" element={authCtx.isLoggedIn ? <Projects/> : <Login/> }></Route>
      </Routes>
    </Layout>
  );
}

export default App;
