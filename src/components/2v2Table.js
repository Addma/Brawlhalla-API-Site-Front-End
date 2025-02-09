import {calcWinRate} from '../util/util.tsx';
const { useNavigate } = require("react-router-dom");


const TwoVsTwoTable = ({sorted2v2, id, name}) => {
    
    const navigate = useNavigate();
    
    const getTeammate = (teammate) =>  {
      console.log("TEAMMATE", teammate);
        if (teammate.brawlhalla_id_one === teammate.brawlhalla_id_two) 
          return {id: 0, name: ''};
        let teamnames = teammate.teamname.split("+");
        console.log(teamnames);
        let player2 = {
          id: id == teammate.brawlhalla_id_one ? teammate.brawlhalla_id_two : teammate.brawlhalla_id_one, 
          name: teamnames[0] === name ? teamnames[1] : teamnames[0], }
        return player2;
      } 

    return (
      <div className='overflow-auto m-0 p-0 h-full'>
        <table className="w-full border-2 border-black p-0 m-0">
        <thead className="bg-black text-white sticky top-0 p-0 border-black border-1 p-0 m-0">            
          <tr className="bg-black p-0 m-0 border-black">
          <th className="border-2 border-black p-0 m-0">2v2</th>
          <th className="border-2 border-black p-0 m-0">Rating</th>
          <th className="border-2 border-black p-0 m-0">W/L</th>
          <th className="border-2 border-black p-0 m-0">Win Rate</th>

          </tr>
        </thead>
        <tbody>
        
        {sorted2v2.map((e, i) => {
          let teammate = getTeammate(e);
          console.log(teammate);
          return teammate.id != 0 && <tr key={i}>
            <td className="border-2 border-black p-1 text-center" ><span className="cursor-pointer" onClick={ev => navigate(`/profile/${teammate.id}`)}>{teammate.name}</span></td>
            <td className="border-2 border-black p-1 text-center">{e.peak_rating}</td>
            <td className="border-2 border-black p-1 text-center">{e.wins}-{e.games - e.wins}</td>
            <td className="border-2 border-black p-1 text-center">{calcWinRate(e.games, e.wins)}%</td>

          </tr>
        })}
        </tbody>
      </table>
      </div>
    )
}
export default TwoVsTwoTable;