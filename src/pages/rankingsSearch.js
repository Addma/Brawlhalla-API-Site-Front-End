import React, { useEffect, useState } from 'react';
import Landing from './landing';
import Nav from '../components/nav';
import { Link, Outlet, useParams, useSearchParams } from 'react-router-dom';
import apiIndex from '../resources/api-index';
import axios from 'axios';
import {ReactComponent as Loading} from '../resources/loading.svg';
import {ReactComponent as Refresh} from '../resources/undo.svg';
export default function RankingsSearch() {
    let params = useParams();

    let [page, setPage] = useState(1);
    let [region, setRegion] = useState("us-e");
    let [bracket, setBracket] = useState("1v1")
    let [pageData, setPageData] = useState([]);
    let [legends, setLegends] = useState(localStorage.getItem("legends"));
    let [openRegion, setOpenRegion] = useState(false);
    let [openBracket, setOpenBracket] = useState(false);
    let [refresh, setRefresh] = useState(false);
    let [refreshClicked, setRefresClicked] = useState(false);
    let [errorMsg, setErrorMsg] = useState('')
    const rotatingStyle = {
        display: 'inline-block',
        animation: 'rotate(360deg) 1s ease-out'
      };
    useEffect(() => {
            retrievePlayers();

    }, [])
    useEffect(() => {
        if (refresh && legends.length > 0 && pageData.length > 0) {
            setRefresh(false);
        }
        console.log("REFRESHED");
        if (refreshClicked && legends.length > 0 && pageData.length > 0) {
            setRefresClicked(false);
        }
    }, [legends.length, pageData.length, refresh, refreshClicked])

    const retrievePlayers = async () => {
        try {
            const res = await axios.get(apiIndex.rankingsPages(bracket, region, page))
            setPageData(res.data);
            
        }
        catch(err) {
            console.log(err.message);
            setRefresh(true);
            setRefresClicked(false);
            setErrorMsg(err.message);
        }

    }
    const retrieveLegends = async () => {
        try {
            let arr = []
            const res = await axios.get(apiIndex.allLegends())
            res.data.forEach(element => {
                arr[element.legend_id] = element
            })
            setLegends(arr);
        } catch(err) {
            console.log(err);
            setRefresh(true);
            setRefresClicked(false);
            setErrorMsg(err.message);

        }

    }
    const refreshData = () => {
        setRefresClicked(true);
        if (pageData.length === 0)
            retrievePlayers();
        if (legends.length === 0)
            retrieveLegends();
    }
    return (
        <div>
        {pageData && legends &&
<div>
    <div className='flex justify-center content-center text-xl space-x-4 items-center bg-white overscroll-y-contain'> 
            Region:         
            <div onClick={() => setOpenRegion(!openRegion)} className="inline-flex justify-center font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {region} 
            {openRegion && <div className='flex flex-col'>
                <div className='absolute' onClick={() => setRegion('us-w')}>us-w</div>
                <div className='absolute' onClick={() => setRegion('eu')}>eu</div>
                <div className='absolute' onClick={() => setRegion('brz')}>brz</div>
                <div className='absolute' onClick={() => setRegion('aus')}>aus</div>
                <div className='absolute' onClick={() => setRegion('sea')}>sea</div>
                </div>}
            </div>
            <div onClick={() => setOpenBracket(!openBracket)} className="inline-flex justify-center font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Bracket:
            {bracket} 
            {openBracket && <div>
                <div className='absolute' onClick={() => setBracket('2v2')}>2v2</div>
                <div className='absolute' onClick={() => setBracket('kungfoot')}>kungfoot</div>
                </div>}
            </div>
        <span className='cursor-pointer' onClick={e => setTimeout(setPage(1), 1000)}>{"<"}</span>
        <span className='cursor-pointer' onClick={e => setTimeout(page - 1 > 0 && setPage(page-1), 1000)}>{page > 1 ? page-1 : "..." }</span> 
        <span className='text-3xl cursor-pointer'>{page}</span> 
        <span className='cursor-pointer' onClick={e => setTimeout(setPage(page+1), 1000)} >{page+1}</span>
        <span className='cursor-pointer' onClick={e => setTimeout(setPage(50), 1000)}>{">"}</span>
        </div>
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 p-4 justify-center place-content-center place-self-center'>
        {pageData.length > 0 && legends.length > 0 ? pageData.map((data, i)=> <div key={i} className="text-left bg-gray-50 rounded border-black border-2 hover:bg-blue-100 p-2">
        <p>{page == 1 ? i + 1 : ((page-1) * 50) + (i+1)}. {data.name} - Peak: {data.peak_rating}</p>
        <p>Best Legend: {legends[data.best_legend].bio_name}<br/>
            <span className='text-lime-500'>W {data.best_legend_wins + "\t"} </span>
            <span className='text-red-500'>L {data.best_legend_games - data.best_legend_wins}</span>
        </p>
        <div>
            Total: 
            <span className='text-lime-500'>W {data.wins + "\t"} </span>
            <span className='text-red-500'>L {data.games - data.wins}</span>
            <p><Link className='text-blue-500 cursor-pointer' to={`/profile/${data.brawlhalla_id}`} >Profile</Link></p>
            <p>Rating: {data.rating} - {data.tier}</p>
        </div>
        </div>) : refresh ? <Refresh onClick={() => refreshData()} className={`w-16 h-16 cursor-pointer delay-500 ${refreshClicked ? 'animate-spin-ease-out' : ''}`} ><p>{errorMsg}</p> </Refresh> : <Loading className='w-16 h-16'/>}
             </div>
</div>}

        </div>
    )

}