
import React from 'react'
import Chart from 'react-apexcharts'
import faker from 'faker'

const data = []
for (let i = 0; i < 1000; i++) {
  data.push({
    x: Math.floor(Date.now() / 1000) + i * 60,
    y: faker.random.number({ min: 1 })
  })
}

const ChartPage = ({ series }) => {
  var config = {
    series: [{
      name: 'XYZ MOTORS',
      data
    }],
    options: {
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      title: {
        text: 'Stock Price Movement',
        align: 'left'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0)
          }
        },
        title: {
          text: 'Price'
        }
      },
      xaxis: {
        type: 'datetime'
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0)
          }
        }
      }
    }
  }

  return (
    <div className='chart-page'>
      <Chart options={config.options} series={config.series} type='line' />
    </div>
  )
}
export default ChartPage
