import { Link } from "react-router-dom";
import OneVsOneCard from "./1v1Card";

const RotatingModeCard =({data, number, state}) => {
    console.log(data);
    return (
       <OneVsOneCard state={state} data={data} number={number}/>
    )
}
export default RotatingModeCard;