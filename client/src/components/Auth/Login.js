import classes from "./AuthForm.module.css";
import apiClient from "../../services/ApiClient";
import React, { useRef, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Toast from 'react-bootstrap/Toast';

function Login() {
  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");
  const emailInputRef = useRef();
  const pwInputRef = useRef();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPw = pwInputRef.current.value;
    if (enteredEmail.trim() === "") {
      setEmailError("*Email must not be empty");
    } else if (!enteredEmail.includes(`@`)) {
      setEmailError("*Enter valid email");
    } else if (enteredPw.trim() === "") {
      setPwError("*Password must not be empty");
      setEmailError("");
    } else {
      setEmailError("");
      setPwError("");
      const { dataresponse, error } = await apiClient.loginUser({
        email: enteredEmail,
        password: enteredPw,
      });
      console.log(dataresponse);
      if (dataresponse.status) {
        authCtx.login();
        navigate("/dashboard");
      } else {
        alert('username or password incorrect')
      }
    }
  };
  // const switchAuthModeHandler = async () => {
  //   const { dataresponse, error } = await apiClient.dummy({
  //     email: "dilshi navodya",
  // })
  // }
  // const islogin = async () => {
  //   const result = await apiClient.isLoggedIn()
  //   console.log(result)
  // }
  // const logout = async () => {
  //   apiClient.logout()
  // }
  return (
    <section className={classes.auth}>
      <h1>Log In</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} />
          {emailError && <p className="error-text">{emailError}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={pwInputRef} />
          {pwError && <p className="error-text">{pwError}</p>}
        </div>
        <div className={classes.actions}>
          <button>Log In</button>
          <Link to="/signup" className={classes.toggle}>
            Sign Up
          </Link>
        </div>
      </form>
      {/* <button
            type='button'
            className={classes.toggle}
            onClick={islogin}
          >logout
          </button> */}
    </section>
  );
}
export default Login;
