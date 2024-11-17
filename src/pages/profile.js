import { useEffect, useState, useCallback} from "react"
import { useParams } from "react-router-dom"
import axios from "axios";
import apiIndex, { rankings } from "../resources/api-index";
import {ReactComponent as Refresh} from "../resources/undo.svg";
import {ReactComponent as Loading} from "../resources/loading.svg"
import Ranked from '../components/ranked.tsx';
import Stats from '../components/stats';
import Clan from '../components/clan';
const Profile = ({id}) => {
    let {brawlhallaId} = useParams();
    console.log(brawlhallaId, "id")
    const [playerData, setPlayerData] = useState({ranked: {}, stats: {} });
    const [clan, setClan] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [refreshClicked, setRefreshClicked] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [tabSelected, setTabSelected] = useState('ranked');
    const refreshData = () => {
            setRefreshClicked(true);
            if (Object.keys(playerData.ranked).length == 0 || Object.keys(playerData.stats) == 0 ) {
                getPlayerData();
            }
    }

    const  getPlayerData = (async () => {
        try {
            const retrievedData = (await axios.get(apiIndex.retrieveData(brawlhallaId))).data
            console.log(retrievedData)
            setPlayerData({...playerData, ranked: retrievedData.ranked, stats: retrievedData.stats})
            setErrorMsg('');
            setClan(retrievedData.stats.clan)
        }catch(err) {
            console.log(err);
            setRefresh(true);
            setRefreshClicked(false);
            setErrorMsg(err.message);
        }
    }) 


    useEffect(() => {
        getPlayerData();
    }, [])
        console.log(playerData);
    return (
        <div>
            
        {Object.keys(playerData.ranked).length != 0 && Object.keys(playerData.stats).length != 0 ?  
        <div>
            <nav>
                <ul className="flex justify-around text-2xl">
                    <li data-value='ranked' onClick={e => setTabSelected(e.target.getAttribute("data-value"))} className={`${tabSelected === "ranked" && 'underline underline-offset-8'} cursor-pointer`}>Ranked</li>
                    <li data-value='stats' onClick={e => setTabSelected(e.target.getAttribute("data-value"))}  className={`${tabSelected === "stats" && 'underline underline-offset-8'} cursor-pointer`}>Stats</li>
                    <li data-value='clan'  onClick={e => setTabSelected(e.target.getAttribute("data-value"))} className={`${tabSelected === "clan" && 'underline underline-offset-8'} cursor-pointer`}>Clan</li>
                </ul>
            </nav>
            {tabSelected === "ranked" ? <Ranked ranked={playerData.ranked} /> : tabSelected === "stats" ? <Stats stats={playerData.stats} /> : <Clan clan={clan}/>}
        </div>
        : refresh ? <Refresh onClick={() => refreshData()} className={`w-16 h-16 cursor-pointer delay-500 m-auto ${refreshClicked ? 'animate-spin-ease-out' : ''}`} ><p className="m-auto">{errorMsg}</p> </Refresh> : <Loading className='w-16 h-16 m-auto'/>}
        </div>
    )
}
export default Profile;