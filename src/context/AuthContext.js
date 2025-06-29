import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import apiIndex from "../resources/api-index";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);

    const loadUser = useCallback(async () => {
            const token = sessionStorage.getItem("token");
                     console.log("LOAD USER", authChecked, user, token,!token || authChecked || user != null    );
            if (!token || authChecked || user != null) return;

            console.log("LOAD USER NOW", authChecked, user, token);
            try {
                const res = await axios.get(apiIndex.getUser(), {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log("AUTH CONTEXT SET USER", res, res.data);
                setUser(res.data);
            } catch(err) {
                setError("Failed to authenticate user.");
            } finally {
                setLoading(false);
                setAuthChecked(true);
            }
    }, [authChecked])
    useEffect(() => {

        loadUser();
    }, [loadUser])
    const login = async () => {
        window.location.href = `${apiIndex.steamLogin()}`;
    }
    const refreshAuth = () => {
        setAuthChecked(false);
        loadUser();
    };
    const logout = () => {
        sessionStorage.removeItem("token");
        console.log("LOGOUT");
        setUser(null);
        setAuthChecked(false);
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
            refreshAuth,
            setUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}