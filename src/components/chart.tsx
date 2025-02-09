import {AxisOptions, Chart} from 'react-charts'
import React from 'react';
type DailyStars = {
    date: Date,
    stars: number,
  }
  
  type Series = {
    label: string,
    data: DailyStars[]
  }
  
  const data: Series[] = [
    {
      label: 'React Charts',
      data: [
        {
          date: new Date(),
          stars: 202123,
        }
        // ...
      ]
    },
    {
      label: 'React Query',
      data: [
        {
          date: new Date(),
          stars: 10234230,
        } 
        // ...
      ]
    }
  ]

  export default function App() {
    const primaryAxis = React.useMemo(
      (): AxisOptions<DailyStars> => ({
        getValue: datum => datum.date,
      }),
      []
    )
  
    const secondaryAxes = React.useMemo(
      (): AxisOptions<DailyStars>[] => [
        {
          getValue: datum => datum.stars,
        },
      ],
      []
    )
  
    return (
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
    )
  }