import React, { useState, useEffect, useContext } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import { AuthContext, AuthProvider } from './context/authContext';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const ctx = useContext(AuthContext)
  console.log(ctx.isLogin);
  

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      ctx.setLogin(true);
    }
  }, []);

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   localStorage.setItem('isLoggedIn', '1');
  //   setLogin(true);
  // };

  // const logoutHandler = () => {
  //   localStorage.removeItem('isLoggedIn');
  //   setLogin(false);
  // };

  return (
    <>
      <MainHeader isAuthenticated={ctx.isLogin}/>
      <main>
        {!ctx.isLogin && <Login/>}
        {ctx.isLogin && <Home/>}
      </main>
    </>
  );
}

export default App;
