import { useEffect, useState, useCallback, useRef, useLayoutEffect, useContext} from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import apiIndex, { rankings } from "../resources/api-index";
import {ReactComponent as Refresh} from "../resources/undo.svg";
import {ReactComponent as Loading} from "../resources/loading.svg"
import Ranked from '../components/ranked.tsx';
import Stats from '../components/stats.js';
import Clan from '../components/clan';
import useImageHeight from "../components/useImageHeight.js";
import { AuthContext } from "../context/AuthContext.js";
import CommentComponent from "../components/CommentComponent.js";
import LoginModal from "../components/LoginModal.js";
const Profile = ({id}) => {
    let {brawlhallaId} = useParams();
    const [playerData, setPlayerData] = useState({ranked: {}, stats: {} });
    const [clan, setClan] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [refreshClicked, setRefreshClicked] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [brawlhallaIdState, setBrawlhallaIdState] = useState(brawlhallaId);
    const tabsRef = useRef([]);
    const underlineRef = useRef(null);
    const tabs = ['Ranked', 'Stats', 'Clan']
    const [tabSelected, setTabSelected] = useState(tabs[0]);
    const [loginModal, setLoginModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const {user, isAuthenticated} = useContext(AuthContext);
    const refreshData = () => {
            setRefreshClicked(true);
            if (Object.keys(playerData.ranked).length == 0 || Object.keys(playerData.stats) == 0 ) {
                getPlayerData();
            }
    }
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
  });
    const  getPlayerData = (async () => {
        if (playerData.ranked.brawlhalla_id == brawlhallaIdState) return;
        try {
            const retrievedData = (await axios.get(apiIndex.retrieveData(brawlhallaId))).data
            setPlayerData({...playerData, ranked: retrievedData.ranked, stats: retrievedData.stats})
            setErrorMsg('');
            setClan(retrievedData.stats.clan)
        }catch(err) {
            setRefresh(true);
            setRefreshClicked(false);
            setErrorMsg(err.message);
            setPlayerData({ranked: {}, stats: {} });
        }
    }) 

    useEffect(() => {
        getPlayerData();
        setTabSelected(tabs[0]);
        setToken(sessionStorage.getItem("token"));
    }, [brawlhallaIdState])

    useEffect(() => {
        setBrawlhallaIdState(brawlhallaId);
    }, [brawlhallaId])


    const handleFocus = () => {
      console.log("HANDLE FOCUS", loginModal);
      if (!isAuthenticated && !user) {
        setLoginModal(true);
      }
    }

    const handleExitModal = () => {
      setLoginModal(false);
    }
    useEffect(() => {
      try {
        let activeTab = tabsRef.current.find(ref => ref.getAttribute("data-value") === tabSelected) 
          underlineRef.current.style.width = `${activeTab.offsetWidth}px`;
          underlineRef.current.style.left = `${activeTab.offsetLeft}px`;
      }
      catch(err) {
        console.log(err)
      }
      }, [tabSelected, playerData, windowSize]);
      
      
        useEffect(() => {
          const handleResize = () => {
            setWindowSize({
              width: window.innerWidth,
              height: window.innerHeight,
            });
          };
      
          window.addEventListener('resize', handleResize);
      
          return () => {
            window.removeEventListener('resize', handleResize);
          };
        }, []);
          
      
    return (
        <div>
          {loginModal && <LoginModal/>}
            <Link to={location.state?.fromPage || '/'} state={location.state}>{`<`}</Link>
        {(Object.keys(playerData.ranked).length != 0 && Object.keys(playerData.stats).length != 0) ?  
        <div className="pb-12">
          <nav className="relative container">
          <ul className="flex justify-around text-2xl relative mb-1">
        {tabs.map((tab, i) =>  
        {if (tab === 'Clan' && !clan) {return}
        else {
          return (
            <li
            key={i}
            ref={el => {tabsRef.current[i] = el;}}
            data-value={tab}
            onClick={e => setTabSelected(e.target.getAttribute("data-value"))}
            className={`select-none cursor-pointer hover:bg-slate-200 rounded active:bg-slate-300 p-1 ${tabSelected === tab ? "text-black" : "  "}`}
          >
            {tab}
          </li>
          )
        }

         }
        )}
      </ul>
      {/* Sliding underline */}
      <div
        ref={underlineRef}
        className="absolute bottom-[5px] h-[3px] bg-gray-700 transition-all duration-500 delay-50"
        style={{ width: 0, left: 0 }}
      ></div>
        </nav>
        
            <div className={`container bg-white p-2`}>
            {tabSelected === "Ranked" ? <Ranked ranked={playerData.ranked} stats={playerData.stats} /> 
            : tabSelected === "Stats" ? <Stats stats={playerData.stats} /> : 
            clan && <Clan clan={clan} name={playerData.ranked.name || playerData.stats.name}/>}
            </div>
            <div className="container mt-4">
                  <CommentComponent brawlhallaId={brawlhallaIdState} token={token} playerData={playerData} onFocus={handleFocus}/>
            </div>
        </div>
        : refresh ? <Refresh onClick={() => refreshData()} className={`w-16 h-16 cursor-pointer delay-500 m-auto ${refreshClicked ? 'animate-spin-ease-out' : ''}`} ><p className="m-auto">{errorMsg}</p> </Refresh> : <Loading className='w-16 h-16 m-auto'/>}
        </div>
    )
}
export default Profile;