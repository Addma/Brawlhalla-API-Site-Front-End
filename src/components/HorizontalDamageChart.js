import { Bar, Doughnut, Pie } from "react-chartjs-2";
import {Chart as ChartJS, Tooltip, Legend, ArcElement, Title, BarElement, LinearScale, CategoryScale, scales, LogarithmicScale} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale
);

export const HorizontalDamageChart = ({legend}) => {
    const options = {
      maintainAspectRatio: false,
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            generateLabels: (chart) => {
              const labels = [
                "Damage Dealt",
                "Damage Taken",
                "Damage Weapon 1",
                "Damage Weapon 2",
                "Damage Unarmed",
                "Damage Thrown",
                "Damage Gadgets"
              ];
              const colors = chart.data.datasets[0].backgroundColor;

              return labels.map((label, index) => ({
                text: label,
                fillStyle: colors[index],
                strokeStyle: colors[index],
                hidden: false,
              }));
            }
          }
        },
        title: {
          display: true,
          text: "Damage"
        },
      },
      scales: {
        x: {
          type: 'logarithmic', // Set the x-axis to logarithmic
          beginAtZero: true,
        },
      }
    };  
    const plugins = [
      ];
    const data =  {
        labels: ['Damage Dealt', 'Damage Taken', 'Damage Weapon 1', 'Damage Weapon 2', 'Damage Unarmed', 'Damage Thrown', 'Gadget Damage'],
        datasets: [
            {
                label: "Damage Dealt", 
                data: [legend.damagedealt, legend.damagetaken, legend.damageweaponone, legend.damageweapontwo, legend.damageunarmed, legend.damagethrownitem, legend.damagegadgets], 
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(252, 255, 89, 0.2)', 'rgba(99, 255, 125, 0.2)', 'rgba(99, 245, 255, 0.2)', 'rgba(99, 109, 255, 0.2)', 'rgba(250, 99, 255, 0.2)', 'rgba(247, 163, 38, 0.2)'],
                borderColor: ['rgb(255, 99, 132, 1)', 'rgb(222, 224, 89)', 'rgb(99, 255, 125)', 'rgb(99, 245, 255)', 'rgb(99, 109, 255)', 'rgb(250, 99, 255)', 'rgb(247, 163, 38)']
            },
                ],
    };
    return <div className="w-full h-80">
      <Bar options={options} data={data} plugins={plugins} />
    </div>

}