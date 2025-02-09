import { ranks } from '../resources/image-index.js';
import { calcWinRate, capitalizeName, getTier } from '../util/util.tsx';


const { useNavigate } = require("react-router-dom");


const OneVsOneTable = ({sorted1v1}) => {
  sorted1v1 = sorted1v1.filter(e => e.rating != 750);
    const navigate = useNavigate();
    return (
<div className='overflow-auto m-0 p-0 h-full '>
        <table className="w-full border -2 overflow-auto">
        <thead className="bg-black text-white sticky top-0 p-0 border-black">            
          <tr className="bg-black p-0 m-0 border-black">
          <th className="border-2 border-black p-1 m-0">Legend</th>
          <th className='border-2 border-black p-1 m-0'>Peak Rating</th>
          <th className="border-2 border-black p-1 m-0">Rating</th>
          <th className="border-2 border-black p-1 m-0">W/L</th>
          <th className='border-2 border-black p-1 m-0'>Win Rate</th>
          <th className='border-2 border-black p-1 m-0'>Rank</th>
          </tr>
        </thead>
        <tbody>
        
        {sorted1v1.map((e, i) => {        
          return <tr key={i}>
            <td className="border-2 border-black p-0.5 text-center" ><span className="cursor-pointer" onClick={ev => navigate(`/legend/${e.legend_id}`)}>{capitalizeName(e.legend_name_key)}</span></td>
            <td className="border-2 border-black p-0.5 text-center" >{e.peak_rating}</td>
            <td className="border-2 border-black p-0.5 text-center">{e.rating}</td>
            <td className="border-2 border-black p-0.5 text-center">{e.wins}-{e.games - e.wins} </td>
            <td className='border-2 border-black p-0.5 text-center'>{calcWinRate(e.games, e.wins)}%</td>
            <td className='border-2 border-black p-0.5 flex'><img src={ranks[getTier(e.tier)]} className='h-10'/>{e.tier}</td>
          </tr>
        })}
        </tbody>
      </table>
      </div>
    )
}
export default OneVsOneTable;