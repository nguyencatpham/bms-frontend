
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
    chart: {
      height: 350,
      type: 'line',
      stacked: false
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#FF1654', '#247BA0'],
    series: [
      {
        name: 'Series A',
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
      },
      {
        name: 'Series C',
        data: [3.4, 3, 4.5, 2.5, 1.5, 3.8, 3.8, 4.6]
      },
      {
        name: 'Series B',
        data: [20, 29, 37, 36, 44, 45, 50, 58]
      }
    ],
    stroke: {
      width: [4, 4]
    },
    plotOptions: {
      bar: {
        columnWidth: '20%'
      }
    },
    xaxis: {
      categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
    },
    yaxis: [
      {
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: '#FF1654'
        },
        labels: {
          style: {
            colors: '#FF1654'
          }
        },
        title: {
          text: 'Series A',
          style: {
            color: '#FF1654'
          }
        }
      },
      {
        opposite: true,
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: '#247BA0'
        },
        labels: {
          style: {
            colors: '#247BA0'
          }
        },
        title: {
          text: 'Series B',
          style: {
            color: '#247BA0'
          }
        }
      }
    ],
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        show: false
      }
    },
    legend: {
      horizontalAlign: 'left',
      offsetX: 40
    }
  }
  return (
    <div className='donut'>
      <Chart options={config} series={config.series} type='line' />
    </div>
  )
}
export default Donut
