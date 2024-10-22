import { useEffect, useState } from 'react';
import React from 'react';
import { Link, Outlet, redirect, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Logo from '../images/Brawlhalla_Logo.webp';
import apiIndex from '../resources/api-index';
import axios from 'axios';
const Landing = () => {
    const [search, setSearch] = useState('');
    const [region, setRegion] = useState('US-E');
    const [mode, setMode] = useState('1v1');
    let [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const openidNs = searchParams.get('openid.ns');
    const openidMode = searchParams.get('openid.mode');
    const openidOpEndpoint = searchParams.get('openid.op_endpoint');
    const openidClaimedId = searchParams.get('openid.claimed_id');
    const openidIdentity = searchParams.get('openid.identity');
    const openidReturnTo = searchParams.get('openid.return_to');
    const openidResponseNonce = searchParams.get('openid.response_nonce');
    const openidAssocHandle = searchParams.get('openid.assoc_handle');
    const openidSigned = searchParams.get('openid.signed');
    const openidSig = searchParams.get('openid.sig');
    useEffect(() => {
        if (openidIdentity) {
            getSteam();
           }
           if (localStorage.getItem("legends") == null) {
                getLegends();
           }
    }, [])

    async function getSteam() {
        try {
            let steamID = openidIdentity.split("/")[openidIdentity.split("/").length - 1];
            let steamAcc = await axios.get(apiIndex.steamSearch(steamID))
            if (steamAcc.status == 200) {
                let authorizedId = steamAcc.data.response.players[0].steamid
                let brawlhallaAcc = await axios.get(apiIndex.brawlhallaSearch(authorizedId))
                navigate(`/profile/${brawlhallaAcc.data.brawlhalla_id}`);
            } else {
                alert("Error retrieving steam account");
            }
        }
        catch(err) {
            console.log(err)
            alert("Error has occurred: " + err.message)
        }
    }

    async function getLegends() {
        console.log("GET LEGNDS");
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
        setRegion('US-E');
        setMode('1v1');
        setSearch('');
        navigate(`/`)
    }
    return (
        <div className="flex flex-col justify-center items-center gap-y-8 mt-4">
            <div >
                <img alt="Brawlhalla Logo" src={Logo} onClick={() => handleHomeButton()}/>
                <div  className='flex-row h-8' >
                <select name="mode" id="mode" onChange={e => setMode(e.target.value)} className='h-full'>
                        <option value="1v1" defaultChecked={true} >1v1</option>
                        <option value="2v2">2v2</option>
                        <option value="kungfoot">kungfoot</option>
                    </select>
                    <select name="region" id="region" onChange={e => setRegion(e.target.value)} defaultValue={'US-E'} className='h-full'>
                        <option value="US-E" defaultChecked={true} >US-E</option>
                        <option value="US-W">US-W</option>
                        <option value="EU">EU</option>
                        <option value="SEA">SEA</option>
                        <option value="BRZ">BRZ</option>
                        <option value="AUS">AUS</option>
                        <option value="JPN">JPN</option>
                        <option value="ALL">ALL</option>
                    </select>
                    <input placeholder="Enter steam name" id="search" value={search} onChange={(e) => setSearch(e.target.value)}  className='h-full'></input>
                    <button className='bg-blue-400 px-4 py-2' onClick={() => navigate(`/rankings/${mode}/${region}/${search}/1`)}>Search</button>
                </div>
            </div>
            <Outlet/>
        </div>
    )
}
export default Landing;