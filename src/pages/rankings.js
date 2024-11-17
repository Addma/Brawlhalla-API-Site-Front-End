

import React, { useCallback, useEffect, useState} from 'react';
import Landing from './landing';
import Nav from '../components/nav';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import apiIndex from '../resources/api-index';
import axios from 'axios';

export default function Rankings(){
    let [searchParams] = useSearchParams();
    let params = useParams();
    let [rankingSearch, setRankingSearch] = useState({});
    let nav = useNavigate();
    console.log(params);
    const retrieveRankingsData = async () => {
        console.log("RANKINGS");
        try {
            console.log(params.bracket, params.name, params.page, params.region)
            if (params.bracket && params.region && params.name && params.page) {
                console.log(params.bracket, params.name, params.page, params.region)
                const res = await axios.get(apiIndex.rankings(params.bracket, params.region, params.page, params.name));
                console.log(res);
                console.log(res.data);
                if (res.status == 200) {
                    setRankingSearch(res.data);
                }
            }

        }
        catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        retrieveRankingsData();

    }, [params])

    return (
        <div className='w-2/5 text-center rounded-xl m-auto'>
            <div className='flex flex-col gap-2'>
            {Object.keys(rankingSearch).length > 0 ? 
            rankingSearch.map((player, i) => {
                return (
                    <div className='bg-stone-200 border-slate-200 rounded-lg m-2 p-2 cursor-pointer hover:scale-110' onClick={() => nav(`/profile/${player.brawlhalla_id}`)} key={i}>
                        <p>{player.name} - Rank # {player.rank} {params.region.toLowerCase() === 'all' && '- ' + player.region}</p>
                        <p>Peak: {player.peak_rating} Current: {player.rating}</p>

                        </div>
                )
            })
                : <h1>Not found</h1>}
            </div>
        </div>
    )

}









