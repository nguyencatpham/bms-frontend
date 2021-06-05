
import React from 'react'
import Chart from 'react-apexcharts'
import faker from 'faker'
import moment from 'moment'

const data = []
for (let i = 0; i < 1000; i++) {
  data.push({
    x: Math.floor(Date.now() / 1000) + i * 60,
    y: faker.random.number({ min: 1 })
  })
}
const Donut = () => {
  const config = {
    series: [{
      name: 'XYZ MOTORS',
      data
    }],
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
  return (
    <div className='donut'>
      <Chart options={config} series={config.series} type='line' />
    </div>
  )
}
export default Donut
