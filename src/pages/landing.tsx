import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { Link, Outlet, redirect, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Logo from '../images/Brawlhalla_Logo.webp';
import apiIndex from '../resources/api-index';
import axios from 'axios';
import { brawlhallaImgs } from '../resources/image-index';
import { User } from '../models/User';
import { setCookie } from '../util/cookies';
const Landing = () => {
    const [search, setSearch] = useState('');
    const [region, setRegion] = useState('ALL');
    const [mode, setMode] = useState('1v1');
    const searchInput = useRef();
    let [searchParams] = useSearchParams();
    let location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("legends") == null) {
            getLegends();
        }
    }, [])


    async function getLegends() {
        try {
            let legends = await axios.get(apiIndex.allLegends())
            
            if (legends.status == 200) {
                let arr = []
                legends.data.forEach(element => {
                    arr[element.legend_id] = element
                })
                localStorage.setItem("legends", JSON.stringify(arr))
            }
        }catch(err) {
            console.log(err)
            alert("Error has occurred: " + err.message)
        }
    }
    function handleHomeButton() {
        setRegion('ALL');
        setMode('1v1');
        setSearch('');
        navigate(`/`)
    }
    function handlePress(e) {
        let button = e.key;
        if (button === "Enter" && document.activeElement === searchInput.current) {
            navigate(`/rankings/${mode}/${region}/${search}/1`);
        }

    }
    return (
        <div className='space-y-24'>
            <div className="flex flex-col justify-center items-center gap-y-8 mt-4">
            {location.pathname === '/' && <img alt="Brawlhalla Logo" className='w-1/4' src={brawlhallaImgs.logo} onClick={() => handleHomeButton()}/>}
            <div className=' flex justify-center h-full items-center bg-white rounded'>
            <span className='px-2 rounded-tl rounded-bl'>Region:</span>
            <select name="region" id="region" onChange={e => setRegion(e.target.value)} defaultValue={'ALL'} className='px-4 py-2 h-full'>
            <option value="ALL">ALL</option>
                <option value="US-E"  >US-E</option>
                <option value="US-W">US-W</option>
                <option value="EU">EU</option>
                <option value="SEA">SEA</option>
                <option value="BRZ">BRZ</option>
                <option value="AUS">AUS</option>
                <option value="JPN">JPN</option>
            </select>
            <input ref={searchInput} placeholder="Enter steam name" id="search" value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={e => handlePress(e)} className='px-4 py-2 lg:w-[500px]'></input>
            <button className='bg-blue-400 px-4 py-2 self-end rounded-tr rounded-br' onClick={() => navigate(`/rankings/${mode}/${region}/${search}/1`)} >Search</button>

            </div>
        </div>
            <Outlet/>
        </div>

    )}

export default Landing;