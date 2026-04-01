import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { Register, Login, Logout, Getme } from "../services/auth.api";


export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await Login({ email, password });  // we have already created this function in service layes that is auth.api.js that is returning response.data;
            setUser(data.user);  // we have sent user in the response in backend login api 

        } catch (error) {
            console.log("Error from useAuth.js-login ", Error);
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await Register({ username, email, password });
            setUser(data.user);
            
        } catch (error) {
            console.log("Error from useAuth.js-register", Error.message);
        }finally{
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            const data = Logout();
            setUser(null);
        } catch (error) {
            console.log("Error from useAuth.js-getme", Error.message);            
        }finally{
            setLoading(false);
        }
    }

    return { user, loading, handleLogin, handleLogout, handleRegister };
}