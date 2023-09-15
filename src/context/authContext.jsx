import React, { createContext, useState } from "react";

export const AuthContext = React.createContext({
    isLogin : null,
    setLogin : ()=> null
})

export const AuthProvider = ({children})=>{
    const [isLogin,setLogin] = useState(false)
    const onLogin = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem('isLoggedIn', '1');
        setLogin(true);
      };
    
      const onLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setLogin(false);
      };
    const value = {isLogin,setLogin,onLogin,onLogout}
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

