import { useEffect, useState } from "react";
import { brawlhallaImgs } from "../resources/image-index";
import { Link } from "react-router-dom";



const Clan = ({clan, name}) => {
    let widthXp = (parseInt(clan.personal_xp) / parseInt(clan.clan_xp)).toFixed(2);
    const [xpCheck, setXpCheck] = useState(new Array(clan.clan_id.clan.length).fill(false))
    clan.clan_id.clan = clan.clan_id.clan.sort((a, b) => b.xp - a.xp)
    const [totalXp, setTotalXp] = useState(0);
    const [calculatedPercentage, setCalculatedPercentage] = useState(0);
    const [allCheck, setAllCheck] = useState(false);
    let findPlayerInd = clan.clan_id.clan.findIndex(e => e.name === name);
    let findPlayer = clan.clan_id.clan.find(e => e.name === name);
    let date = new Date(findPlayer.join_date * 1000).toDateString();

    function calculatePercentageTotalXp () {
        setCalculatedPercentage((totalXp / clan.clan_xp).toFixed(2));
    }
    function handleChecked(ind) {
        if (ind < 0) {
            setAllCheck(!allCheck)
            if (!allCheck) {
                setTotalXp(clan.clan_id.clan.reduce((accumulator, val) => {
                    if (accumulator.xp) {
                        return parseInt(accumulator.xp) + parseInt(val.xp);
                    }
                    return accumulator + parseInt(val.xp);
                }));
                
                setXpCheck(xpCheck.map(x => true))
            } else {
                setXpCheck(xpCheck.map(x => false))
                setTotalXp(0);
            }
            
            return;

        }
        let checked = [...xpCheck];
        checked[ind] = !checked[ind];
        setXpCheck(checked);
        if (checked[ind]) {
            setTotalXp(totalXp + clan.clan_id.clan[ind].xp);
        } else {
            setTotalXp(totalXp - clan.clan_id.clan[ind].xp);
        }
    }
    useEffect(() => {
        let xpChecked = [...xpCheck];
        xpChecked[findPlayerInd] = true;
        setXpCheck(xpChecked);
        setTotalXp(clan.personal_xp);
    }, [])
    useEffect(() => {
        calculatePercentageTotalXp();
    }, [xpCheck, allCheck])

    return (
        <div>
            <h1 className="text-5xl text-center">{clan.clan_name} </h1>
            <div className="mt-8">
                <div className="border-2 border-black w-[500px] h-[50px] relative">
                    <h1 className="absolute top-[-25px]">{totalXp > clan.personal_xp ? 'Selected' : 'Personal'} XP {totalXp} - {calculatedPercentage * 100 < 1 ? '<1' : calculatedPercentage * 100}% of total clan XP</h1>
                        <div style={{width: calculatedPercentage * 500}} className={`bg-green-500 h-[46px]`}></div>
                    <h1 className="absolute right-0">Total Clan XP {clan.clan_xp}</h1>
                    </div>
                <div>
                </div>
            </div>
            <div className="overflow-auto m-0 p-0 w-fit h-[100vh]">
            <table className="mt-8  border-2 border-black p-0 m-0 overflow-auto">
                <thead className="bg-black text-white sticky top-0 p-0 border-black border-1 p-0 m-0">
                    <tr className="bg-black p-0 m-0 border-black">
                        <th className="border-2 border-black p-0 m-0">Name</th>
                        <th className="border-2 border-black p-0 m-0">Rank</th>
                        <th className="border-2 border-black p-0 m-0">Join Date</th>
                        <th className="border-2 border-black p-0 m-0">XP</th>
                        <th className="border-2 border-black p-0 m-0"><input type="checkbox" checked={allCheck} onChange={e => handleChecked(-1)}/></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                <tr key={findPlayerInd}>
                        <td className="border-2 border-black p-1 text-center">{findPlayer.name}</td>
                        <td className="border-2 border-black p-1"><img  src={brawlhallaImgs[findPlayer.rank.toLowerCase()]} alt={findPlayer.rank}/></td>
                        <td className="border-2 border-black p-1">{date}</td>
                        <td className="border-2 border-black p-1">{(parseInt(findPlayer.xp) / parseInt(clan.clan_xp)).toFixed(2) * 100}% {`(${findPlayer.xp})`}</td>
                        <td className="border-2 border-black p-1"><input type="checkbox" checked={xpCheck[findPlayerInd]} onChange={e => handleChecked(findPlayerInd)} /></td>

                    </tr>
                {clan.clan_id.clan.map((member, i) => {
                    let date = new Date(parseInt(member.join_date) * 1000);
                    if (i == findPlayerInd) {
                        return null;
                    }
                    return(
                    <tr key={i}>
                        <td className="border-2 border-black p-1 text-center"><Link to={`/profile/${member.brawlhalla_id}`}>{member.name}</Link></td>
                        <td className="border-2 border-black p-1"><img  src={brawlhallaImgs[member.rank.toLowerCase()]} alt={member.rank}/></td>
                        <td className="border-2 border-black p-1">{date.toDateString()}</td>
                        <td className="border-2 border-black p-1">{(parseInt(member.xp) / parseInt(clan.clan_xp)).toFixed(2) * 100}% {`(${member.xp})`}</td>
                        <td className="border-2 border-black p-1"><input type="checkbox" checked={xpCheck[i]} onChange={e => handleChecked(i)} /></td>

                    </tr>)
                })}

                </tbody>
            </table>
            </div>
        </div>
    )
    
    }
export default Clan