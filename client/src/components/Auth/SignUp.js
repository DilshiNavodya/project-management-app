import classes from "./AuthForm.module.css";
import apiClient from "../../services/ApiClient";
import React, { useRef, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
function SignUp() {
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const pwInputRef = useRef();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPw = pwInputRef.current.value;
    if (enteredName.trim() === "") {
      setNameError("*Name must not be empty");
    } else if (enteredEmail.trim() === "") {
      setEmailError("*Email must not be empty");
      setNameError("");
    } else if (!enteredEmail.includes(`@`)) {
      setEmailError("*Enter valid email");
      setNameError("");
    } else if (enteredPw.trim() === "") {
      setPwError("*Password must not be empty");
      setEmailError("");
      setNameError("");
    } else {
      setNameError("");
      setEmailError("");
      setPwError("");
      const { dataresponse, error } = await apiClient.registerUser({
        name: enteredName,
        email: enteredEmail,
        password: enteredPw,
      });
      if (dataresponse.status) {
        authCtx.login();
        navigate("/dashboard");
      } else {
        alert('something went wrong. Try again.')
      }
    }
  };
  return (
    <section className={classes.auth}>
      <h1>Sign Up</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            ref={nameInputRef}          />
          {nameError && <p className="error-text">{nameError}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="text"
            id="email"
            ref={emailInputRef}
          />
          {emailError && <p className="error-text">{emailError}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            ref={pwInputRef}
          />
          {pwError && <p>{pwError}</p>}
        </div>
        <div className={classes.actions}>
          <button>Sign Up</button>
          <Link to="/login" className={classes.toggle}>
            Sign In
          </Link>
        </div>
      </form>
    </section>
  );
}
export default SignUp;
