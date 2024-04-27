'use client'

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import moment from 'moment'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
)

export default function HistoryChart(props: { symbol: string; prices: any }) {
  return (
    <Line
      options={{ responsive: true }}
      data={{
        labels: props.prices.map((value) => moment(value[0]).format('MMM DD')),
        datasets: [
          {
            fill: true,
            label: props.symbol,
            data: props.prices.map((val) => val[1].toFixed(2)),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      }}
    />
  )
}
