
import React from 'react'
import Chart from 'react-apexcharts'
import moment from 'moment'
import { SHORT_DATE_FORMAT } from 'constant'

const Donut = ({ data = [] }) => {
  console.log(data)
  const config = {
    chart: {
      height: 350,
      type: 'line',
      stacked: false
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#52c41a', '#096dd9', '#fa8c16'],
    series: [
      {
        name: 'Vo',
        data: data.map(x => x.v0)
      },
      {
        name: 'E',
        data: data.map(x => x.e)
      },
      {
        name: 'R',
        data: data.map(x => x.r)
      }
    ],
    stroke: {
      show: true,
      // curve: 'smooth',
      // lineCap: 'butt',
      colors: undefined,
      width: 2,
      dashArray: 0
    },
    plotOptions: {
      bar: {
        columnWidth: '20%'
      }
    },
    xaxis: {
      categories: data.map(x => moment(x.timestamp).format(SHORT_DATE_FORMAT))
    },
    yaxis: [
      {
        // axisTicks: {
        //   show: true
        // }
        // axisBorder: {
        //   show: true,
        //   color: '#FF1654'
        // }
        // labels: {
        //   style: {
        //     colors: '#FF1654'
        //   }
        // }
        // title: {
        //   text: 'Vo',
        //   style: {
        //     color: '#FF1654'
        //   }
        // }
      },
      // {
      //   // opposite: true,
      //   axisTicks: {
      //     show: true
      //   },
      //   axisBorder: {
      //     show: true,
      //     color: '#247BA0'
      //   },
      //   labels: {
      //     style: {
      //       colors: '#247BA0'
      //     }
      //   },
      //   title: {
      //     text: 'E',
      //     style: {
      //       color: '#247BA0'
      //     }
      //   }
      // },
      {
        opposite: true
        // axisTicks: {
        //   show: true
        // },
        // axisBorder: {
        //   show: true,
        //   color: '#247BA0'
        // }
        // labels: {
        //   style: {
        //     colors: '#247BA0'
        //   }
        // },
        // title: {
        //   text: 'R',
        //   style: {
        //     color: '#247BA0'
        //   }
        // }
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
