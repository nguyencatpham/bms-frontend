import React from 'react'
import Chart from 'react-apexcharts'

const ChartPage = ({ series, labels }) => {
  var config = {
    series,

    options: {
      // chart: {
      //   type: 'radialBar'
      // },
      plotOptions: {
        pie: {
          // startAngle: 0,
          // endAngle: 360,
          expandOnClick: true,
          // offsetX: 0,
          // offsetY: 0,
          // customScale: 1,
          // dataLabels: {
          //     offset: 0,
          //     minAngleToShowLabel: 10
          // },
          donut: {
            size: '52%',
            background: 'transparent',
            labels: {
              show: true,
              name: {
                show: true,
                offsetY: -7,
                formatter: function (val) {
                  return 'Tổng số'
                }
              },
              value: {
                show: true,
                offsetY: 10,
                formatter: function (val) {
                  return val
                }
              },
              total: {
                show: true,
                showAlways: true,
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b
                  }, 0)
                }
              }
            }
          }
        }
      },
      grid: {
        show: false,
        padding: {
          top: 40,
          right: 0,
          bottom: -50,
          left: 0
        }
      },

      tooltip: {
        theme: 'dark',
        y: {
          formatter: function (val) {
            return val
          }
        }
      },
      fill: {
        opacity: 1
      },
      // colors: ['#1ab7ea', '#75cb6e', '#f64b4e'],
      colors: ['#017EFA', '#9E7777', '#ED4845'],
      // labels: ['Đã triển khai', 'Đang hoạt động', 'Mất kết nối'],
      labels: ['Hiện diện', 'Không hiện diện', 'Cảnh báo'],
      legend: {
        horizontalAlign: 'left',
        offsetX: -35,
        offsetY: 14,
        // width: 300,
        position: 'top',
        fontSize: '15px',
        itemMargin: {
          horizontal: 5,
          vertical: 5,
          backgroundColor: '#eee'
        },
        formatter: function (seriesName, opts) {
          return (
            seriesName +
            ':  ' +
            opts.w.globals.series[opts.seriesIndex]
          )
        },
        markers: {
          width: 12,
          height: 12,
          radius: '50%'
        }
        // horizontalAlign: 'left',
        // offsetX: 40
      }
    }
  }

  return (
    <div className='chart-page'>
      <Chart
        options={config.options}
        series={config.series}
        type='donut'
        // width="100%"
        height='310'
        // style={{ minHeight: '400px' }}
      />
    </div>
  )
}
export default ChartPage
