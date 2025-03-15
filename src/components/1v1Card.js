import { Link, NavLink } from "react-router-dom";
import { legendHeadshots, legendThumbnails, ranks } from "../resources/image-index";
import { calcWinRate, getTier } from "../util/util.tsx";
import { useRef, useState } from "react";
import useImageHeight from "./useImageHeight.js";
const OneVsOneCard =({data, number, state}) => {
    let legends = JSON.parse(localStorage.getItem("legends"));
    console.log(legends[data.best_legend]);
    let legendsName = legendThumbnails[[legends[data.best_legend].legend_name_key] + "_thumbnail"]
    console.log(data.best_legend, legends[data.best_legend], data, legendsName)
    return (
        <div key={data.name} className="text-left bg-gray-50 rounded border-black border-2 hover:bg-blue-100 flex flex-col justify-between items-center align-center content-end">
            <div className="bg-indigo-300 text-center w-full">   
                <p>{data.region} Rank #{number}. {data.name}</p>
  q
                <span className='text-lime-600'> W {data.wins + "\t"} </span>
                <span className='text-red-600'>L {data.games - data.wins}</span>
                 <span> WR {calcWinRate(data.games, data.wins)}%</span>
            </div>  
            Rating: {data.rating} Peak: {data.peak_rating}
            <p className="text-center relative w-full flex justify-center items-center "  >            
                 {data.best_legend <= legends.length - 1 &&
                <img loading="lazy" src={legendsName} className=" rounded-3xl absolute z-10 bottom-[-50px] w-1/2 bg-slate-200 rounded-full"  />}
                <img loading="lazy" src={ranks[getTier(data.tier)]} className=" w-1/2  " />
           </p>
            <Link className ='text-blue-500 cursor-pointer text-7xl hover:text-blue-700 p-1 justify-self-end place-self-end' to={`/profile/${data.brawlhalla_id}`} state={state}>{">"}</Link>
        </div>
    )
}
export default OneVsOneCard;