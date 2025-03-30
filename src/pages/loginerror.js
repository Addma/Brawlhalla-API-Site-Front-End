import React from 'react';
import { useSearchParams, useLocation, Link, useNavigate } from 'react-router-dom';

const LoginError = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
    const navigate = useNavigate();
    let message = searchParams.get("message");
    console.log(message);
    return (
        <div>
            <p>{location.state.message}</p>
            <button onClick={navigate(-1)}>Go back</button>
        </div>
    )
}
export default LoginError;