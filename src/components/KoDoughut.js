import {Doughnut } from "react-chartjs-2";
import {Chart as ChartJS, Tooltip, Legend, ArcElement, Title, BarElement, LinearScale, CategoryScale, scales, LogarithmicScale} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale
);

export const KoDoughnut = ({legend}) => {
    const options = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: "KOs"
        },
      },
    };  
    const plugins = [
      ];
    const data =  {
        labels: ['Total KOs', 'Gadget KOs', 'Thrown Item KOs', 'Unarmed KOs', 'Weapon 1 KOs', 'Weapon 2 KOs', 'Team KOs'],
        datasets: [
            {
                data: [legend.kos, legend.kogadgets, legend.kothrownitem, legend.kounarmed, legend.koweaponone, legend.koweapontwo, legend.teamkos], 
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(252, 255, 89, 0.2)', 'rgba(99, 255, 125, 0.2)', 'rgba(99, 245, 255, 0.2)', 'rgba(99, 109, 255, 0.2)', 'rgba(250, 99, 255, 0.2)', 'rgba(247, 163, 38, 0.2)'],
                borderColor: ['rgb(255, 99, 132, 1)', 'rgb(222, 224, 89)', 'rgb(99, 255, 125)', 'rgb(99, 245, 255)', 'rgb(99, 109, 255)', 'rgb(250, 99, 255)', 'rgb(247, 163, 38)']
            },
                ],
    };
    return <div className="w-1/2 h-[500px]">
      <Doughnut options={options} data={data} plugins={plugins}  />
    </div>

}