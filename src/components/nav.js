
import { Link, Outlet, useParams } from "react-router-dom";
import steam from "../resources/sits_01.png";
import apiIndex from "../resources/api-index";
import { brawlhallaImgs } from "../resources/image-index";
const Nav = () => {
      const link = `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=` +
      `http://specs.openid.net/auth/2.0/identifier_select&openid.return_to=${apiIndex.url2}&openid.realm=${apiIndex.url2}&openid.mode=checkid_setup`
    return (
        <div className="mt-4">
    <nav>
    <ul className="flex m-0 p-0 justify-around text-2xl text-white items-center">
    <Link to="/"><li><img className="w-24" src={brawlhallaImgs.logo}/></li></Link>
    <Link to="/rankings"><li>Rankings</li></Link>
    <Link to="/about"><li>About</li></Link>
    <a href={link}><li><img src={steam} className="h-10"/></li></a>
    </ul>
    </nav>
    <Outlet/>
</div>
    )
}
export default Nav;