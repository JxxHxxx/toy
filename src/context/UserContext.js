import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <AuthContext.Provider value = {{isLogin, setIsLogin}}>
            {children}
        </AuthContext.Provider>
    )
}