import { TIME_ONLY_FORMAT } from 'constant'
import moment from 'moment'
import React from 'react'
import Chart from 'react-apexcharts'

const ChartPage = ({ series, labels }) => {
  var config = {
    series,
    options: {
      chart: {
        // height: 350,
        type: 'line',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        // width: [5, 7, 5],
        width: 3,
        curve: 'straight'
        // dashArray: [0, 8, 5]
      },
      colors: series.map((s) => s.color),
      legend: {
        show: true
        // tooltipHoverFormatter: function (val, opts) {
        //   return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
        // },
      },
      markers: {
        size: 5,
        hover: {
          size: 7
        }
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return moment(value * 1000).format(TIME_ONLY_FORMAT)
          }
        }
      },
      tooltip: {
        theme: 'dark',
        y: [
          {
            title: {
              formatter: function (val) {
                return val + '<span style="margin-right: 2rem;"></span>'
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val + '<span style="margin-right: 2rem;"></span>'
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val + '<span style="margin-right: 2rem;"></span>'
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val + '<span style="margin-right: 2rem;"></span>'
              }
            }
          }
        ]
      },
      grid: {
        borderColor: '#eee',
        // borderColor: '#f1f1f1',
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      }
    }
  }

  return (
    <div className='chart-page'>
      <Chart
        options={config.options}
        series={config.series}
        type='line'
        height='455'
        // style={{ minHeight: '400px' }}
      />
    </div>
  )
}
export default ChartPage
