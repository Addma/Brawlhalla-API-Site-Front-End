import axios from "axios";
import { createContext, useEffect, useState } from "react";
import apiIndex from "../resources/api-index";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const res = await axios.get(apiIndex.getUser(), {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUser(res.data);
            } catch(err) {
                setError("Failed to authenticate user.");
            } finally {
                setLoading(false);
            }
        }
        loadUser();
    })
    const login = async () => {
        window.location.href = "http://localhost:8080/api/auth/steam/login";
        /*
try {
            const res = await axios.get(apiIndex.steamLogin());
            console.log(res, "res");
            window.location.href = res.response.data;
        } catch(err) {
            setError("Failed to initiate login");
            console.log('Login error', err);
        }*/
    }
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }
    return (
        <AuthContext.Provider
        value={{
            user,
            loading,
            error,
            login,
            logout,
            isAuthenticated: !!user,
            setUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}