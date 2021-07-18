
import React from 'react'
import Chart from 'react-apexcharts'

const ChartPage = ({ series, labels }) => {
  const config = {
    series,
    options: {
      plotOptions: {
        pie: {
          customScale: 0.84,
        }
      },
      legend: {
        show: true,
        position: 'bottom',
        fontSize: '15px',
        formatter: function (seriesName, opts) {
          return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex]
        },
        itemMargin: {
          horizontal: 10
        }
      },
      labels,
      colors: ['#75cb6e', '#faad14', '#f64b4e'],
    }
  }
  return (
    <div className='chart-page'>
      <Chart options={config.options} series={config.series} type='donut' />
    </div>
  )
}
export default ChartPage
