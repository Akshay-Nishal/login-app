import React, { useContext } from 'react';
import Navigation from './Navigation';
import classes from './MainHeader.module.css';
import { AuthContext } from '../../context/authContext';
  
const MainHeader = (props) => {
  const ctx = useContext(AuthContext)
  return (
    <header className={classes['main-header']}>
      <h1>A Typical Page</h1>
      <Navigation isLoggedIn={props.isAuthenticated} onLogout={ctx.onLogout} />
    </header>
  );
};

export default MainHeader;
