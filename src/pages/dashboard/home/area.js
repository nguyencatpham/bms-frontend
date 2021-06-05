
import React from 'react'
import Chart from 'react-apexcharts'

const Donut = () => {
  const config = {
    options: {
      chart: {
        height: 280,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100]
        }
      },
      xaxis: {
        categories: [
          '01 Jan',
          '02 Jan',
          '03 Jan',
          '04 Jan',
          '05 Jan',
          '06 Jan',
          '07 Jan'
        ]
      }
    },
    series: [
      {
        name: 'Series 1',
        data: [45, 52, 38, 45, 19, 23, 2]
      }
    ]
  }
  return (
    <div className='donut'>
      <Chart options={config.options} series={config.series} type='area' />
    </div>
  )
}
export default Donut
