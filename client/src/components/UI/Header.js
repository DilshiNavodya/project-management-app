import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context'
import classes from './Header.module.css'
import apiClient from '../../services/ApiClient';
function Header () {
    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;
    console.log(isLoggedIn)

    const navigate = useNavigate();
    const logoutHandler = async () => {
      apiClient.logout()
      authCtx.logout()
      navigate('/')
    }
    return (
        <header className={classes.header}>
        <div className={classes.logo}></div>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to='/login'>Login</Link>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to='/signup'>SignUp</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to='/projects'>Projects</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
    )
}
export default Header