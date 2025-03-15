import { useEffect, useRef, useState } from "react";
import { capitalizeName, legendWeapons, simplifyNums } from '../util/util.tsx';
import { useNavigate } from "react-router-dom";
import { legendImgs, legendThumbnails, brawlhallaImgs, weaponImgs } from "../resources/image-index.js";
import { Pie } from 'react-chartjs-2';
import { HorizontalDamageChart } from "./HorizontalDamageChart.js";
import { KoDoughnut } from "./KoDoughut.js";
const Stats = ({stats}) => {
    function processLegends() {
        let processLegends = stats.legends.sort((a, b) => b.level - a.level);
        processLegends = processLegends.map(legend => {
            return {...legend, openCard: false, openWeaponOne: false, openWeaponTwo: false};
        })
        return processLegends;
    }
    const [legends, setLegends] = useState(processLegends);

    let openCardRefs = useRef([]);
    function setOpenCard (val, ind) {
        setLegends(legends.map((legend, i) => i === ind ? {...legend, openCard: val} : legend))
    }
    function setOpenWeaponOne (val, ind) {

        setLegends(legends.map((legend, i) => i === ind ? {...legend, openWeaponOne: val} : legend));
    }
    function setOpenUnarmed (val, ind) {
        setLegends(legends.map((legend, i) => i === ind ? {...legend, openUnarmed: val} : legend))
    }
    function setOpenWeaponTwo (val, ind) {
        setLegends(legends.map((legend, i) => i === ind ? {...legend, openWeaponTwo: val} : legend))
    }
    function setLegendVisible(val, ind,e) {
        setLegends(legends.map((legend, i) => i === ind ? {...legend, visible: val} : legend))
    }
    useEffect(() => {
        //console.log("LEGENDS", legends);
    }, [legends])
    function matchTimeFormat(matchTime) {
        let minutes = matchTime / 60;
        if (minutes < 60) {
            let seconds = minutesToSeconds(minutes % parseInt(minutes));
            return `${parseInt(minutes)}M ${parseInt(seconds)}S played`
        }else if (minutes > 60 && minutes < 1440) {
            let hours = minutesToHours(minutes);
            let mins = hoursToMinutes(hours % parseInt(hours));
            let seconds = minutesToSeconds(mins % parseInt(mins));
            return `${parseInt(hours)}H ${parseInt(mins)}M ${parseInt(seconds)}S played`
        } else {
            let days = minutesToDays(parseInt(minutes));
            let hours = daysToHours(days % parseInt(days));
            let mins = hoursToMinutes(hours % parseInt(hours));
            let seconds = minutesToSeconds(mins % parseInt(mins));
            console.log(hours);
            return `${parseInt(days)}D ${parseInt(hours)}H ${parseInt(mins)}M ${parseInt(seconds)}S played`
        }
    }
    function minutesToDays(minutes) {
        return minutes / 1440;
    }
    function daysToHours(days) {
        return days * 24;
    }
    function minutesToHours(minutes) {
        return minutes / 60;
    }
    function hoursToMinutes(hours) {
        return hours * 60;
    }
    function minutesToSeconds(minutes) {
        return minutes * 60
    }
    return (
        <div className="flex flex-col gap-4">
        {legends.map((legend,i) => {
            if (i == 0) {
                console.log(matchTimeFormat(legend.matchtime))
            }
            let matchTime = `${parseInt((legend.matchtime / 60)/legend.games) }m ${parseInt(minutesToSeconds(((legend.matchtime / 60)/legend.games) % parseInt((legend.matchtime / 60)/legend.games)))}s`
            let timeWeapon1 = (parseInt(legend.timeheldweaponone) / parseInt(legend.games)).toFixed(0)
            let timeWeapon2 = (parseInt(legend.timeheldweapontwo) / parseInt(legend.games)).toFixed(0)
            let fallsPerGame = (parseInt(legend.games) / parseInt(legend.falls)).toFixed(2);
            let suicidesPerGame = (legend.games / legend.suicides).toFixed(0);
            let suicidesPercent = ((parseInt(legend.suicides) / parseInt(legend.games)) * 100).toFixed(2);
            let percentXp = legend.level === 1000 ? 100 : 100 * legend.xp_percentage
            let winRate = legend.wins / legend.games;
            let weaponOneDmgPerGame = (legend.damageweaponone / legend.games).toFixed(1);
            let weaponTwoDmgPerGame = (legend.damageweapontwo / legend.games).toFixed(1);
            let weaponOneDmgPerSecond = (legend.damageweaponone / legend.matchtime).toFixed(1);
            let weaponTwoDmgPerSecond = (legend.damageweapontwo / legend.matchtime).toFixed(1);
            let weaponOneKOsPerMin = (legend.koweaponone / (legend.timeheldweaponone / 60)).toFixed(2);
            let weaponTwoKOsPerMin = (legend.koweapontwo / (legend.timeheldweapontwo / 60)).toFixed(2);
            let timeHeldPerMatchWeaponOne = (legend.timeheldweaponone / legend.games).toFixed(1);
            let timeHeldPerMatchWeaponTwo = (legend.timeheldweapontwo / legend.games).toFixed(1);
            let gamesPerTeamKO = (legend.games / legend.teamkos).toFixed(0);
            let dps = (legend.damagedealt / legend.matchtime).toFixed(2)
            let gamesPerGadgetKO = (legend.games / legend.kogadgets).toFixed(0);
            let gamesPerUnarmedKO = (legend.games / legend.kounarmed).toFixed(0);
            let unarmedDmgPerGame = (legend.damageunarmed / legend.games).toFixed(1);
            let unarmedKOsPerMin = (legend.kounarmed / (legend.matchtime - legend.timeheldweaponone - legend.timeheldweapontwo)).toPrecision(2);
            let unarmedDPS = (legend.damageunarmed / legend.matchtime).toPrecision(2);
            return (
               <div key={i} onClick={e => {console.log("OPEN", !legend.openCard);e.stopPropagation();!legend.openCard && setOpenCard(true, i); !legend.visible && setLegendVisible(true, i)}}   className={` bg-blue-500 p-4 transition-all ease-in duration-500 flex flex-col ${!legend.openCard && 'select-none cursor-pointer'}`}>
                <h1  className={`text-4xl ${legend.openCard ? 'invisible' : 'visible'}`}>{capitalizeName(legend.legend_name_key)}</h1>
                <div ref={ref => openCardRefs.current[i] = ref}  className={`overflow-hidden transition-all duration-1000 linear gap-y-2 flex flex-col p-2 ${legend.openCard ? 'max-h-[200vh] opacity-100' : 'max-h-0 opacity-0'} bg-white`} > 
                <h1 className="text-black text-4xl">{capitalizeName(legend.legend_name_key)}</h1>
                <div className="flex justify-around items-end place-items-center flex-wrap gap-2">
                <img className='rounded-full xl:w-1/4 lg:w-1/3 md:w-1/2' src={legendThumbnails[legend.legend_name_key + "_thumbnail"]} alt={legend.legend_name_key}/>
                {legend.visible && <KoDoughnut legend={legend}/>}
                </div>
                <div className="flex flex-col gap-4">
                    <p>{matchTimeFormat(legend.matchtime)}</p>

                        <span>Average match time: {matchTime}</span>
                        <span>Suicide chance {suicidesPercent}% ---- {suicidesPerGame} games per suicide {`(${legend.suicides})`}</span>
                        <span>1 fall per {fallsPerGame} games</span>
                        <span>DPS {dps}</span>
                        <span>{gamesPerTeamKO} games per team KO </span>
                        <span>{gamesPerGadgetKO} games per gadget KO</span>
                        <span>{gamesPerUnarmedKO} games per unarmed KO</span>
                            <div>
                                <h1 className="cursor-pointer select-none" onClick={e => setOpenWeaponOne(!legend.openWeaponOne, i)}>{capitalizeName(legendWeapons[legend.legend_name_key].weaponone).replace("_", " ")}
                                    <div className="w-[90%] border-b border-black"></div>
                                </h1>
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out gap-4 flex flex-wrap ${legend.openWeaponOne ? 'max-h-[200vh] opacity-100 border-b-2' : 'max-h-0 opacity-0'}`}> 
                                        <img src={`${weaponImgs[legendWeapons[legend.legend_name_key].weaponone]}`} className="w-[100px]"/>
                                        <p>Dmg/game {weaponOneDmgPerGame}</p>
                                        <p>DPS {weaponOneDmgPerSecond}</p>
                                        <p>KOs/min {weaponOneKOsPerMin}</p>
                                        <p>{timeHeldPerMatchWeaponOne}s time held per match</p>

                                    </div>
                            </div>

                            <div> 
                                <h1 className="cursor-pointer select-none" onClick={e => setOpenWeaponTwo(!legend.openWeaponTwo, i)}>{capitalizeName(legendWeapons[legend.legend_name_key].weapontwo).replace("_", " ")}
                                <div className="w-[90%] border-b border-black"></div>

                                </h1>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out gap-4 flex flex-wrap ${legend.openWeaponTwo ? 'max-h-[200vh] opacity-100 border-b-2' : 'max-h-0 opacity-0'}`}> 

                                <img src={`${weaponImgs[legendWeapons[legend.legend_name_key].weapontwo]}`} className="w-[100px]"/>
                                <p>Dmg/game {weaponTwoDmgPerGame}</p>
                                <p>DPS {weaponTwoDmgPerSecond}</p>
                                <p>KOs/min {weaponTwoKOsPerMin}</p>
                                <p>{timeHeldPerMatchWeaponTwo}s time held per match</p>

                                </div>
                            </div>
                            <div>
                                <h1 className="cursor-pointer select-none" onClick={e => setOpenUnarmed(!legend.openUnarmed, i)}>
                                    Unarmed
                                    <div className="w-[90%] border-b border-black"></div>
                                </h1>
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out gap-4 flex flex-wrap ${legend.openUnarmed ? 'max-h-[200vh] opacity-100 border-b-2' : 'max-h-0 opacity-0'}`}> 
                                        <img src={`${weaponImgs.unarmed}`} className="w-[100px]"/>
                                        <p>Dmg/game {unarmedDmgPerGame}</p>
                                        <p>DPS {unarmedDPS}</p>
                                        <p>KOs/min {unarmedKOsPerMin}</p>
                                        <p>{timeHeldPerMatchWeaponOne}s time held per match</p>

                                    </div>
                            </div>

                    </div>
                    <div className="h-[25px] w-[75%] border-black border-2 m-2 rounded bg-red-500">
                        <div style={{width: legend.level == 100 ? "100%" : `${legend.level}%`}}className={` h-auto bg-green-500 h-full`}> </div>
                        <p>{legend.xp_percentage === 0 ? "Max level" :  `Level ${legend.level} / 100` } </p>
                    </div>

                    <div className="h-[25px] w-[75%] border-black border-2 ml-2 mt-8 rounded bg-red-500">
                        <div style={{width: `${(legend.wins / legend.games).toFixed(2) * 100}%`}}className={` h-auto bg-green-500 h-full`}> </div>
                        <p>{legend.games > 0 ? `W: ${legend.wins} L: ${legend.games - legend.wins} ---- ${(((legend.wins / legend.games) * 100).toFixed(2))}% win rate` :  `` } </p>
                    </div>
                    <div className="h-[25px] w-[75%] border-black border-2 ml-2 mt-8 rounded bg-red-500">
                        <div style={{width: legend.level == 100 ? "100%" : parseInt(percentXp) + "%"}}className={` h-auto bg-green-500 h-full`}> </div>
                        <p>{legend.xp_percentage === 0 ? "Max level" : legend.xp_percentage.toFixed(2) * 100 + "% progress next level ---- " + legend.xp + " XP"} </p>
                    </div>
                    {legend.visible && <HorizontalDamageChart legend={legend}/>}
                </div>
                <p className={`${legend.openCard ? 'rotate-180' : 'rotate-0'} transition-transform text-3xl text-right w-fit duration-150 delay-700 place-self-end cursor-pointer`} onClick={e => {if(legend.openCard)e.stopPropagation();setOpenCard(false, i)}} > \/</p>
               </div>)
        })}
        
        </div>
    )
    
    }

    export default Stats;
    