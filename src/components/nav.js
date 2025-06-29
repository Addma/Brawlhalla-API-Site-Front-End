
import { Link, Outlet, redirect, useNavigate, useParams, useSearchParams } from "react-router-dom";
import steam from "../resources/sits_01.png";
import apiIndex, { steamLogin } from "../resources/api-index";
import { brawlhallaImgs } from "../resources/image-index";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
const Nav = () => {
    const [viewWidth, setViewWidth] = useState(window.innerWidth);
    const [openMenu, setOpenMenu] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const {isAuthenticated, user, logout, login} = useContext(AuthContext);
    console.log(user, "USER");
    useEffect(() => {        
        const resizeObserver = new ResizeObserver(() => {
            setViewWidth(window.innerWidth);
        })

        resizeObserver.observe(document.body)

        const params = {};
        searchParams.forEach( (value, key) => {
          params[key] = value;
        });

        return(() => {
            resizeObserver.disconnect();
        })
    }, [])
    useEffect(() => {
        if (viewWidth < 1000) {
            setOpenMenu(false);
        }
    }, [viewWidth])

    return (
        viewWidth > 1000 ? 
        <div className="mt-4">
        <nav>
        <ul className="flex m-0 p-0 justify-around text-2xl text-white items-center">
        <Link to="/"><li><img className="w-24" src={brawlhallaImgs.logo}/></li></Link>
        <Link to="/rankings"><li>Rankings</li></Link>
        <Link to="/about"><li>About</li></Link>
        {isAuthenticated ? 
        <div onClick={e => navigate(`/profile/${user.brawlhallaId}`)} className="cursor-pointer">
            <p>{user.name}</p>
            <img src={user?.avatar} alt="" />
            <p onClick={() => logout()}>Log out</p>
        </div>

        :
             <img src={steam} className="h-10" alt="" onClick={login}/>}
        </ul>
        </nav>
        <Outlet/>
        </div>
        : 
        <div className="">
            <div className="fixed top-0 left-0 bg-blue-500">
            <div className={`m-2 h-[25px] relative flex flex-col justify-between cursor-pointer`} onClick={() => setOpenMenu(!openMenu)}>
                <div className={`w-[30px] h-[5px] bg-white rounded-full origin-center transition-all duration-300 ${openMenu ? 'rotate-45 translate-y-[10px]' : ''}`}></div>
                <div className={`w-[30px] h-[5px] bg-white rounded-full transition-all duration-300 ${openMenu ? 'opacity-0' : ''}`}>  </div>
                <div className={`w-[30px] h-[5px] bg-white rounded-full  transition-all duration-300 ${openMenu ? '-rotate-45 translate-y-[-10px]' : ''}`}></div>
            </div>
            <div className={`bg-blue-500 p-2 h-[30vh] absolute transition-all duration-300 list-none flex flex-col gap-2 text-white border-t border-white absolute ${openMenu ? "translate-x-[0px] opacity-100" : "-translate-x-[100px] opacity-0"}`}>
                <Link to="/"><li>Home</li></Link>
                <Link to="/rankings"><li>Rankings</li></Link>
                <Link to="/about"><li>About</li></Link>
                {isAuthenticated ? 
                <div>
                <a onClick={e => navigate(`/profile/${user.brawlhallaId}`)} className="cursor-pointer h-6">
                    <p>{user.name}</p>
                    <img src={user.avatar ? user.avatar : JSON.parse(user).avatar} alt="" />
                    <p onClick={logout}>Logout</p>
                </a> 
                </div>
                :
                <img src={steam} className="h-10" onClick={login}/>
                }
            </div>
            </div>
        <Outlet/>
        </div>
    )
    
}
export default Nav;