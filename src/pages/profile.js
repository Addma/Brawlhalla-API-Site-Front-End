import { useEffect, useState, useCallback} from "react"
import { useParams } from "react-router-dom"
import axios from "axios";
import apiIndex, { rankings } from "../resources/api-index";
const Profile = ({id}) => {
    let {brawlhallaId} = useParams();
    console.log(brawlhallaId, "id")
    const [playerData, setPlayerData] = useState({ranked: {}, stats: {} });
    const [clan, setClan] = useState({});

    const  getPlayerData = useCallback(async () => {
        try {
            const retrievedData = (await axios.get(apiIndex.retrieveData(brawlhallaId))).data
            console.log(retrievedData)
            setPlayerData({...playerData, ranked: retrievedData.ranked, stats: retrievedData.stats})

        }catch(err) {
            console.log(err);
        }
    }) 


    useEffect(() => {
        if (Object.keys(playerData.ranked).length === 0 || Object.keys(playerData.stats).length ===  0)
        getPlayerData();
    }, [getPlayerData, playerData])

    return (
        <div>
            
        <p>{Object.keys(playerData.ranked).length != 0 && Object.keys(playerData.stats).length != 0 ?  
        <p>{playerData.ranked.name}</p>
        : "Not found/loading"}</p>
        </div>
    )
}
export default Profile;