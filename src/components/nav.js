
import { Link, Outlet, redirect, useNavigate, useParams, useSearchParams } from "react-router-dom";
import steam from "../resources/sits_01.png";
import apiIndex, { steamLogin } from "../resources/api-index";
import { brawlhallaImgs } from "../resources/image-index";
import { useEffect, useState } from "react";
import axios from "axios";
const Nav = () => {
    const [viewWidth, setViewWidth] = useState(window.innerWidth);
    const [openMenu, setOpenMenu] = useState(false);
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const steamOpenIdUrl = 'https://steamcommunity.com/openid/login';
    let url = 'http://localhost:3000';
    function loginToSteam() {
        const params = new URLSearchParams({
            'openid.ns': 'http://specs.openid.net/auth/2.0',
            'openid.mode': 'checkid_setup',
            'openid.return_to': url,
            'openid.realm': url,
            'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
            'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select'
        })
        return `${steamOpenIdUrl}?${params.toString()}`;
    }
    

    
    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem("user")));
        const resizeObserver = new ResizeObserver(() => {
            setViewWidth(window.innerWidth);
        })

        resizeObserver.observe(document.body)
        return(() => {
            resizeObserver.disconnect();
        })

    }, [])
    useEffect(() => {

        const params = {};
        searchParams.forEach(async (value, key) => {
          params[key] = value;
          if (params['openid.mode'] && params['openid.identity'])
          { try {
            let verifyLogin = await axios({
                method: "POST",
                url: apiIndex.steamVerify(),
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(params)
            })
            let stringUser = JSON.stringify(verifyLogin.data);
            sessionStorage.setItem("user", stringUser);
            console.log("SET USER API");
            setUser(stringUser);
            navigate(`profile/${verifyLogin.data.brawlhallaId}`);
          }
          catch(err) {
            console.log(err);
          }

          }
        });
    }, [])
    useEffect(() => {
        if (viewWidth < 1000) {
            setOpenMenu(false);
        }
    }, [viewWidth])
    const logout = () => {
        setUser(null);
        sessionStorage.setItem('user', null);
    }
    console.log(user);
    return (
        viewWidth > 1000 ? 
        <div className="mt-4">
        <nav>
        <ul className="flex m-0 p-0 justify-around text-2xl text-white items-center">
        <Link to="/"><li><img className="w-24" src={brawlhallaImgs.logo}/></li></Link>
        <Link to="/rankings"><li>Rankings</li></Link>
        <Link to="/about"><li>About</li></Link>
        {user ? 
        <div onClick={e => navigate(`/profile/${user.brawlhallaId}`)} className="cursor-pointer">
            <p>{user.name}</p>
            <img src={user.avatar} alt="" />
            <p onClick={() => logout()}>Log out</p>
        </div>

        :
            <li><a href={loginToSteam()} target="_blank"><img src={steam} className="h-10"/></a></li>}
        </ul>
        </nav>
        <Outlet/>
        </div>
        : 
        <div className="">
            <div className="fixed top-0 left-0 bg-blue-500">
            <div className={`m-2 w-[30px] h-[25px] relative flex flex-col justify-between cursor-pointer`} onClick={() => setOpenMenu(!openMenu)}>
                <div className={`w-[30px] h-[5px] bg-white rounded-full origin-center transition-all duration-300 ${openMenu ? 'rotate-45 translate-y-[10px]' : ''}`}></div>
                <div className={`w-[30px] h-[5px] bg-white rounded-full transition-all duration-300 ${openMenu ? 'opacity-0' : ''}`}>  </div>
                <div className={`w-[30px] h-[5px] bg-white rounded-full  transition-all duration-300 ${openMenu ? '-rotate-45 translate-y-[-10px]' : ''}`}></div>
            </div>
            <div className={`bg-blue-500 w-fit p-2 h-[30vh] absolute transition-all duration-300 list-none flex flex-col gap-2 text-white border-t border-white absolute ${openMenu ? "translate-x-[0px] opacity-100" : "-translate-x-[100px] opacity-0"}`}>
                <Link to="/"><li>Home</li></Link>
                <Link to="/rankings"><li>Rankings</li></Link>
                <Link to="/about"><li>About</li></Link>
                {user ? 
                <div onClick={e => navigate(`/profile/${user.brawlhallaId}`)} className="cursor-pointer h-6">
                    <p>{user.name}</p>
                    <img src={user.avatar} alt="" />
                </div> 
                :
                <li><a href={loginToSteam()} target="_blank"><img src={steam} className="h-6"/></a></li>
                }
            </div>
            </div>
        <Outlet/>
        </div>
    )
    
}
export default Nav;