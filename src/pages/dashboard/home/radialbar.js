
import React from 'react'
import Chart from 'react-apexcharts'

const ChartPage = ({ series }) => {
  var config = {
    series,
    
    options: {
      chart: {
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '30%',
            background: 'transparent',
            image: undefined
          },
          
          dataLabels: {
            name: {
              show: true
            },
            value: {
              show: true
            }
          }
        }
      },
      colors: ['#1ab7ea', '#75cb6e', '#f64b4e'],
      labels: ['Đã triển khai', 'Đang hoạt động', 'Mất kết nối'],
      legend: {
        show: true,
        position: 'bottom',
        fontSize: '15px',
        formatter: function (seriesName, opts) {
          return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex] + '%'
        },
        itemMargin: {
          horizontal: 10
        }
      },
    }
  }

  return (
    <div className='chart-page'>
      <Chart options={config.options} series={config.series} type='radialBar' />
    </div>
  )
}
export default ChartPage
