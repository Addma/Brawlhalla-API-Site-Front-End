import { Link } from "react-router-dom";
import { ranks } from "../resources/image-index";
import { calcWinRate } from "../util/util.tsx";

const TwoVsTwoCard =({data, number, state}) => {
    const getTeammate = (teamname) => {
        if (teamname)
        return teamname.split("+");
        else
        return 0;
    }
    let teammates = getTeammate(data.teamname);
    return (
        <div key={data.teamname} className="text-left bg-gray-50 rounded border-black border-2 h-full  ">
                <div className="bg-indigo-300 p-1 ">
                <p className="text-center"> 
                    Rank #{number} 
                    

                    {` (${calcWinRate(data.games, data.wins)}% WR) `}
                </p>
                </div>
                <div className="flex flex-wrap ">
                <Link  to={`/profile/${data.brawlhalla_id_one}`} className="hover:bg-black hover:text-white focus:text-grey-500 w-1/3 text-center rounded flex justify-center items-center p-1 break-words"  state={state}>{teammates[0]}</Link>

                    <p className="w-1/3 items-center justify-center flex flex-col hover:bg-blue-100 text-center"><span className="text-green-600">W {data.wins}</span> <span className="text-red-600">L {data.games-data.wins}</span>
                    Rating {data.rating}
                    <img src={ranks[data.tier]} className="w-16 " />
                    </p>
                    
                    <Link  to={`/profile/${data.brawlhalla_id_two}`}  className="hover:bg-black hover:text-white focus:text-grey-500 w-1/3 text-center flex justify-center items-center p-1" state={state}>{teammates[1]}</Link>
                </div>
        </div>
    )
}
export default TwoVsTwoCard;