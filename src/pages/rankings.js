

import React, { useCallback, useEffect, useState} from 'react';
import Nav from '../components/nav';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import apiIndex from '../resources/api-index';
import axios from 'axios';
import {ReactComponent as Loading} from '../resources/loading.svg';
import {ReactComponent as Refresh} from '../resources/undo.svg';
import OneVsOneCard from '../components/1v1Card';
export default function Rankings(){
    let params = useParams();
    let [rankingSearch, setRankingSearch] = useState({});
    let [refresh, setRefresh] = useState(false);
    let [refreshClicked, setRefreshClicked] = useState(false);
    const location = useLocation();
    console.log(location)
    let state = {
        fromPage: location.pathname
    }
    let [errorMsg, setErrorMsg] = useState('');
    let nav = useNavigate();
    console.log(params);

    const refreshData = () => {
        setErrorMsg('');
        setRefreshClicked(true);
        retrieveRankingsData();
    }
    const retrieveRankingsData = async () => {
        console.log("RANKINGS");
        try {
            console.log(params.bracket, params.name, params.page, params.region)
            if (params.bracket && params.region && params.name && params.page) {
                console.log(params.bracket, params.name, params.page, params.region)
                const res = await axios.get(apiIndex.rankings(params.bracket, params.region, params.page, params.name));
                console.log(res);
                console.log(res.data);
                if (res.status == 200 && res.data.length > 0) {
                    setRankingSearch(res.data);
                } else {
                    setErrorMsg("Not found");
                    setRefresh(true);
                    setRefreshClicked(false);
                    setRankingSearch({});
                }
            }

        }
        catch (err) {
            console.log(err);
            setRefresh(true);
            setErrorMsg(err.message)
            setRefreshClicked(false);
        }

    }

    useEffect(() => {
        retrieveRankingsData();

    }, [params])
    return (
        <div className='w-full rounded-xl flex justify-center'>
            {Object.keys(rankingSearch).length > 0 ? 
                        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  justify-center place-content-center place-self-center w-3/4'>
                    {rankingSearch.map((player, i) => {
                            return (
                                <OneVsOneCard data={player} state={state} number={player.rank}/>
                            )
                        })}
                        </div>
            : refresh ? <div className='flex justify-center flex-col place-items-center'><Refresh onClick={() => refreshData()} className={`w-16 h-16 cursor-pointer delay-500 ${refreshClicked ? 'animate-spin-ease-out' : ''}`} /> <p>{errorMsg}</p></div> 
             : <div><Loading onClick={() => refreshData()} className='w-16 h-16' /></div>}

        </div>
    )

}









