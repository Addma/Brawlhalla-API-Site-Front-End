import {ranks, legendImgs, brawlhallaImgs} from "../resources/image-index";
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import TwoVsTwo from "./2v2Table";
import {calcWinRate, getTier} from '../util/util.tsx';
import OneVsOne from "./1v1Table";
import useImageHeight from "./useImageHeight.js";

interface RankedProps {
    ranked: {
        games: number,
        brawlhalla_id: number,
        name: string,
        tier: string;
        legends: Legend[]
        peak_rating: number
        region: string;
        rotating_ranked: RotatingRanked;
        rating: number,
        wins: number,
        "2v2": Array<RankedTwos>
    },
    stats: {
      name: string,
      legends: Legend[]
      rating: number,
      wins: number,
      games: number
    }
}

interface RankedTwos { 
  brawlhalla_id_one: number,
  brawlhalla_id_two: number,
  games: number,
  global_rank: number,
  peak_rating: number,
  rating: number,
  region: number,
  teamname: string,
  tier: string,
  wins: number
}
interface Legend {
    legend_id: number;
    rating: number;
    wins: number;
    legend_name_key: string;
    peak_rating: number;
    games: number;
  }
interface RotatingRanked {
  games: number,
  peak_rating: number,
  rating: number,
  region: string,
  tier: string,
  wins: number,
}
const Ranked: React.FC<RankedProps> = ({ranked, stats}) => {
    const [sortedLegends, setSortedLegends] = useState<Legend[]>([]);
    const [sorted2v2, setSorted2v2] = useState<Legend[]>([]);
    const [displayRanked , setDisplayRanked] = useState<Number>(0);
    const [imgHeight, setImageHeight] = useState<number | undefined>(0);
    const {height, imgRef, updateHeight} = useImageHeight();
    const [isRanked, setIsRanked] = useState(false);
  const legendRef = useRef<HTMLImageElement>(null);
    const sortAscending = (arr, setType) => {
      let res = arr.sort((a, b) => b.peak_rating - a.peak_rating) 

      if (res.length == 0 || res[0].peak_rating == 0) {
        res = arr.sort((a, b) => b.rating - a.rating);
      }
      if (setType === '2v2') {
        setSorted2v2(res);
      } else {
        setSortedLegends(res);
      } 
    }
  
    useEffect(() => {
      if (ranked.tier !== "none") {
        setIsRanked(true);
      }
      if (ranked.legends.length > 0) {
        sortAscending(ranked.legends, 'legends');
        sortAscending(ranked['2v2'], '2v2');
      } else {
        sortAscending(stats.legends, 'legends');

      }
    }, [ranked, stats])
    const navigate = useNavigate();
    return (
      <div className="h-full">
        <h1 className="text-center text-3xl p-4">{ranked.name || stats.name}</h1>
        {sortedLegends.length !== 0 && 
        <div className="flex justify-around align-center h-full flex-wrap gap-6">
          <div className="flex flex-col place-items-center gap-4 p-2" 
          >
            <p>{isRanked ? ranked.region : "Region unknown"}</p>
          <div className="relative h-[600px] w-[300px] flex justify-center align-center items-center">
          <img
            src={sortedLegends[0]?.legend_name_key ? legendImgs[sortedLegends[0].legend_name_key.replace(" ", "_")] : ''}
            className="w-[250px] absolute z-10"
            
            alt={sortedLegends[0].legend_name_key}
          />
                    <img
            src={ranks[getTier(ranked.tier) + "_Frame"] || ranks.Default_Frame}
            className="w-full absolute"
            ref={imgRef}
            alt=""
            onLoad={updateHeight}
          />
             </div>

          
            {displayRanked == 0 ?

                       <div className="flex flex-col justify-center items-center p-1">
                       <h1>1v1</h1>
                       <img
                       loading="lazy"
                       className="h-24" 
                         src={isRanked ? ranks[getTier(ranked.tier)] : ''}
                         alt=""
                       />
                       <p>{isRanked ? ranked.peak_rating : 'Unranked'}</p>
                       <p className="text-xs">{isRanked && ranked.rating}</p>
                       <p>{isRanked ? `${ranked.wins} - ${ranked.games-ranked.wins}` : `${stats.wins} - ${stats.games-stats.wins}`}</p>
                       <p>{isRanked ? calcWinRate(ranked.games, ranked.wins) : calcWinRate(stats.games, stats.wins) }% Win Rate</p>
                       </div>
             : Object.keys(ranked.rotating_ranked).length > 0 &&
             <div className="flex flex-col justify-center items-center p-1">
                        <h1>Rotating</h1>
                       <img
                         src={(ranked.rotating_ranked.tier && ranks[ranked.rotating_ranked.tier.split(" ")[0]]) || ''}
                        className="h-24"
                        loading="lazy"
                         alt=""
                       />
                       <p>{ranked.rotating_ranked.peak_rating}</p>
                       <p className="text-xs">{ranked.rotating_ranked.rating}</p>
                       <p>{ranked.rotating_ranked.wins} - {ranked.rotating_ranked.games-ranked.rotating_ranked.wins}</p>
                       <p className="">{calcWinRate(ranked.rotating_ranked.games, ranked.rotating_ranked.wins)}% Win Rate</p>
                       </div>
              }
              <div className="flex">
                <div onClick={e => displayRanked && setDisplayRanked(displayRanked ? 0 : 1)} className={!displayRanked ? 'bg-black border border-white h-4 w-4' : 'bg-white border border-black h-4 w-4'}></div>
                {Object.keys(ranked.rotating_ranked).length > 0 && 
                <div onClick={e => !displayRanked && setDisplayRanked(displayRanked ? 0 : 1)} className={displayRanked ? 'bg-black border border-white h-4 w-4' : 'bg-white border border-black h-4 w-4'}></div>}
              </div>
            </div>
           {isRanked && <div className={'h-full'} style={{height: height ? `${height-24}px` : '0px'}}>
            <h1 className="relative text-blue-500">Legends Ranked</h1>
            <OneVsOne sorted1v1={sortedLegends}  />
          </div>}
          { isRanked &&
          <div className="h-full" style={{height: height ? `${height-24}px` : '0px'}}>
            <h1 className="relative text-blue-500" >2v2 Ranked</h1>
          <TwoVsTwo sorted2v2={sorted2v2} name={ranked.name} id={ranked.brawlhalla_id} />

          </div>
          }
        </div> }
        </div>
    );
}
export default Ranked;
