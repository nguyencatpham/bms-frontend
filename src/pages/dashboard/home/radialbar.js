
import React from 'react'
import Chart from 'react-apexcharts'

const ChartPage = ({ series }) => {
  var config = {
    series,
    options: {
      chart: {
        height: 390,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
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
      colors: ['#1ab7ea', '#0084ff', '#f64b4e'],
      labels: ['Đã triển khai', 'Đang hoạt động', 'Mất kết nối'],
      legend: {
        show: true,
        floating: true,
        fontSize: '16px',
        position: 'left',
        offsetX: 0,
        offsetY: 15,
        labels: {
          useSeriesColors: true
        },
        markers: {
          size: 0
        },
        formatter: function (seriesName, opts) {
          return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex] + '%'
        },
        itemMargin: {
          vertical: 3
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            show: false
          }
        }
      }]
    }
  }

  return (
    <div className='chart-page'>
      <Chart options={config.options} series={config.series} type='radialBar' />
    </div>
  )
}
export default ChartPage
