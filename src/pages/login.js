import React, { useContext, useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {ReactComponent as Loading} from '../resources/loading.svg';
import axios from 'axios';
import apiIndex from '../resources/api-index';
const Login = () => {
  const { isAuthenticated, login } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {setUser} = useContext(AuthContext);
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
        localStorage.setItem("token", token);
        const fetchUser = async () => {
            try {
                const res =await axios.get(apiIndex.getUser(), {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUser(res.data);
                navigate(`/profile/${res.data.brawlhallaId}`)
            } catch(err) {
                console.error("Failed to fetch user data");
                navigate('/login/error', {
                    state: { message: "Failed to fetch user data"}
                })
            }
        }
        fetchUser();
    } else {
        navigate('/login/error', {
            state: { message: "No authentication token provided"}
        })
    }

  }, [searchParams, navigate, setUser])
  if (isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="login">
        <Loading/>
    </div>
  );
};

export default Login;