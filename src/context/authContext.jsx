import React, { createContext, useState } from "react";

export const AuthContext = React.createContext({
    isLogin : null,
    setLogin : ()=> null
})

export const AuthProvider = ({children})=>{
    const [isLogin,setLogin] = useState(false)
    const value = {isLogin,setLogin}
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

