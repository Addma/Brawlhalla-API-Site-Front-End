import React, { useEffect, useRef, useState } from 'react';
import Landing from './landing';
import Nav from '../components/nav';
import { Link, Outlet, useLocation, useParams, useSearchParams } from 'react-router-dom';
import apiIndex from '../resources/api-index';
import axios from 'axios';
import {ReactComponent as Loading} from '../resources/loading.svg';
import {ReactComponent as Refresh} from '../resources/undo.svg';
import OneVsOneCard from '../components/1v1Card';
import RotatingModeCard from '../components/RotatingModeCard';
import TwoVsTwoCard from '../components/2v2Card';
export default function RankingsSearch() {
    let params = useParams();
    let regions = ['us-e', 'us-w', 'eu', 'brz', 'aus', 'sea']
    let brackets = ['1v1', '2v2', 'kungfoot']
    const location = useLocation();

    let [pageData, setPageData] = useState([]);
    let [legends, setLegends] = useState(localStorage.getItem("legends"));
    let [openRegion, setOpenRegion] = useState(false);
    let [openBracket, setOpenBracket] = useState(false);
    let [refresh, setRefresh] = useState(false);
    let [refreshClicked, setRefreshClicked] = useState(false);
    let [errorMsg, setErrorMsg] = useState('')
    let [page, setPage] = useState(location.state?.page || 1);
    let [region, setRegion] = useState(location.state?.region || regions[0]);
    let [bracket, setBracket] = useState(location.state?.bracket || brackets[0])
    const [loading, setLoading] = useState(false);
    const bracketRef = useRef(null);
    const regionRef = useRef(null);
    const [state, setState] = useState({
        page: location.state?.page || page,
        region: location.state?.region || region,
        bracket: location.state?.bracket || bracket,
        fromPage: location.pathname})
    
    useEffect(() => {
            retrievePlayers();

    }, [])
    useEffect(() => {
        setLoading(true);
        retrievePlayers();
        setState({...state, page: page, region: region,bracket: bracket})
}, [region, page, bracket])

    const retrievePlayers = async () => {
        console.log(loading);
        try {
            setLoading(true);
            const res = await axios.get(apiIndex.rankingsPages(bracket, region, page))
            console.log(res.data);
            setPageData(res.data);
        }
        catch(err) {
            console.log(err.message);
            setRefresh(true); 
            setRefreshClicked(false);
            setErrorMsg(err.message);
        } finally {
            setLoading(false);
        }

    }
    useEffect(() => {
        function checkClick(e) {
            if (openBracket || openRegion){
                if (e.target !== bracketRef.current && e.target !== regionRef.current) {
                    setOpenRegion(false);
                    setOpenBracket(false);
            }  
            }
 
    }
        if (openRegion || openBracket) {
            window.addEventListener('click', checkClick);
        }

        return () => {
            window.removeEventListener('click', checkClick);
        }
    }, [openRegion, openBracket])
    const retrieveLegends = async () => {
        try {
            let arr = []
            const res = await axios.get(apiIndex.allLegends())
                res.data.forEach(element => {
                arr[element.legend_id] = element
            })
            setLegends(arr);
        } catch(err) {
            setErrorMsg(err.message);
        } finally {
            setRefresh(true);
            setRefreshClicked(false);
        }

    }
    const refreshData = () => {
        setRefreshClicked(true);
        if (pageData.length === 0)
            retrievePlayers();
        if (legends.length === 0)
            retrieveLegends();
    }
    return (
        <div>
        {pageData && legends &&
<div>
    <div className='flex justify-center content-center text-xl space-x-4 items-center bg-white h-[50px]'> 
            <div className="font-medium text-gray-700 flex gap-4">
                    <span className='flex'>Region:
            <div className='absolute relative  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer whitespace-nowrap' onClick={() => setOpenRegion(!openRegion)} ref={regionRef}>
                {region}
                    {openRegion && <div className='absolute bg-white w-fit border-black border-2 border-t-0' >
                        {regions.map(regionEl => 

                region !== regionEl && <div className='p-1' onClick={() => {setPage(1);setRegion(regionEl)}}>{regionEl}</div>
                        )}
                </div>}
                </div></span>
                <span className='flex'>Bracket:
            <div className=' relative hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer whitespace-nowrap' onClick={() => setOpenBracket(!openBracket)} ref={bracketRef}>
                {bracket}
                    {openBracket && <div className='absolute bg-white w-fit border-black border-2 border-t-0' >
                {bracket !== '1v1' && <div className='p-1' onClick={() => {setPage(1);setPageData([]);setBracket('1v1')}}>1v1</div>}
                {bracket !== '2v2' && <div className='p-1' onClick={() => {setPage(1);setPageData([]);setBracket('2v2')}}>2v2</div>}
                {/*bracket !== 'kungfoot' && <div className='p-1' onClick={() => {setPage(1);setBracket('kungfoot')}}>kungfoot</div>*/}
                </div>}
                </div></span>
            </div>
        <span className='cursor-pointer' onClick={e => setTimeout(setPage(1), 1000)}>{"<"}</span>
        <span className='cursor-pointer' onClick={e => setTimeout(page - 1 > 0 && setPage(page-1), 1000)}>{page > 1 ? page-1 : "..." }</span> 
        <span className='text-3xl cursor-pointer'>{page}</span> 
        <span className='cursor-pointer' onClick={e => setTimeout(setPage(page+1), 1000)} >{page+1}</span>
        <span className='cursor-pointer' onClick={e => setTimeout(setPage(page + 50 - ((page + 50) % 50)), 1000)}>{">"}</span>
        </div>
        {pageData.length > 0 && legends ?
                <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 justify-center place-content-center place-self-center w-full 2xl:w-4/5'>

        {pageData.map((data, i)=> {
            return bracket === '1v1' ? <OneVsOneCard state={state} data={data} key={i} number={page == 1 ? i + 1 : ((page-1) * 50) + (i+1)}/> : bracket === '2v2' ? <TwoVsTwoCard state={state} data={data} key={i} number={page == 1 ? i + 1 : ((page-1) * 50) + (i+1)}/> : <RotatingModeCard state={state} data={data} number={page == 1 ? i + 1 : ((page-1) * 50) + (i+1)}/>
        })}
                     </div>
         : refresh ? <Refresh onClick={() => refreshData()} className={`w-16 h-16 cursor-pointer delay-500 m-auto ${refreshClicked ? 'animate-spin-ease-out' : ''}`} ><p className='text-center'>{errorMsg}</p> </Refresh> : <Loading className='w-16 h-16 m-auto'/>}
</div>}
        </div>
    )

}