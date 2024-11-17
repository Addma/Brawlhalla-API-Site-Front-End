import imageIndex from "../resources/image-index";
import React from 'react';
interface RankedProps {
    ranked: {
        name: string,
        tier: string;
        legends: Legend[]
    }
}
interface Legend {
    legend_name_key: string;
    peak_rating: number;
  }

const Ranked: React.FC<RankedProps> = (props) => {
    
    console.log(props);
    console.log(imageIndex[props.ranked.tier]);
    let topLegend: Legend = {legend_name_key: '', peak_rating: 0}
    for (const key in props.ranked.legends) {
        let curLegend = props.ranked.legends[key]
        if (curLegend.peak_rating > topLegend.peak_rating) {
            topLegend = curLegend;
        }
    }
    function capitalizeName(name: string): string {
        let letter = String(name).charAt(0).toUpperCase();
        return letter + String(name).slice(1)
    }
    let sortedLegends = props.ranked.legends.sort((a, b) => b.peak_rating - a.peak_rating)
    console.log(sortedLegends);
    return (
        <div className="container xl bg-white p-2">
        <h1>{props.ranked.name}</h1>
        <div className="flex flex-col w-1/2">
          <img
            src={imageIndex[sortedLegends[0]?.legend_name_key] || ''}
            className="w-32"
            alt=""
          />
          <img
            src={imageIndex[props.ranked.tier] || ''}
            className="w-12"
            alt=""
          />
          <p>{capitalizeName(sortedLegends[0].legend_name_key)}</p>
        </div>
      </div>
    );
}
export default Ranked;
