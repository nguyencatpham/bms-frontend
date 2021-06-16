
import React from 'react'
import Chart from 'react-apexcharts'

const ChartPage = ({ series, labels }) => {
  const config = {
    series,
    options: {
      chart: {
        type: 'donut'
      },
      labels,
      colors: ['#75cb6e', '#faad14', '#f64b4e'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  }
  return (
    <div className='chart-page'>
      <Chart options={config.options} series={config.series} type='donut' />
    </div>
  )
}
export default ChartPage
