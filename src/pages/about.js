import React from 'react';
import { clearCookies, getCookie } from '../util/cookies';
export default function About(){
    console.log(document.cookie, "cookie");

    return (
        <div>
        <h1>ABOUT</h1>
        <button onClick={() => clearCookies()}>Clear</button>
        <button onClick={() => console.log(document.cookie)}>Cookies</button>

        </div>

    )

}