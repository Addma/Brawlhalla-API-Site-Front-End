import { Link } from "react-router-dom";
import { legendHeadshots, ranks } from "../resources/image-index";
import { calcWinRate } from "../util/util.tsx";
const PlayerSearchCard =({data, number, state}) => {
    let legends = JSON.parse(localStorage.getItem("legends"));

    return (
        <div key={data.name} className="text-left bg-gray-50 rounded border-black border-2 hover:bg-blue-100 w-full">
        <p className="bg-black text-white">{number}. {data.name} - Peak: {data.peak_rating}</p>
        <p className="flex ">Best Legend: <img src={legendHeadshots[legends[data.best_legend].legend_name_key + "_headshot"]} className="w-16" />
        <div>
            <p className='text-lime-500'>W {data.best_legend_wins + "\t"} </p>
            <p className='text-red-500'>L {data.best_legend_games - data.best_legend_wins} <span className="text-black">{"(" + parseInt(calcWinRate(data.best_legend_games, data.best_legend_wins)) + "% WR)"}</span></p>
            </div>
        </p>
        <div>
            Total: 
            <span className='text-lime-500'>W {data.wins + "\t"} </span>
            <span className='text-red-500'>L {data.games - data.wins}</span>
            <p><Link className='text-blue-500 cursor-pointer' to={`/profile/${data.brawlhalla_id}`} state={state}>Profile</Link></p>
            <p>Rating: {data.rating} <img src={ranks[data.tier]} className="w-16" /></p>
        </div>
        </div>
    )
}
export default PlayerSearchCard;