import { useState,createContext, useEffect } from "react";
import { Getme } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getUserSetUser = async()=>{
            const data = await Getme();
            setUser(data.user);
            setLoading(false);
        }
        getUserSetUser(); 
    },[])

    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}