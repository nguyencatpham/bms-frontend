import React from 'react'
import Chart from 'react-apexcharts'
import { TIME_ONLY_FORMAT } from 'constant'
import moment from 'moment'

const ChartPage = ({ series, labels }) => {
  var config = {
    series,
    options: {
      chart: {
        // height: 350,
        type: 'line',
        toolbar: {
          show: false
        },
        offsetX: 0,
        offsetY: 0
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
        show: true,
        position: 'bottom',
        offsetX: -650,
        offsetY: 5,
        itemMargin: {
          horizontal: 17,
          vertical: 0
        },
        formatter: function (val, opts) {
          return val[0]
        }
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
      yaxis: [
        {
          seriesName: 'R',
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: '#000'
          },
          labels: {
            show: true,
            offsetX: -20,
            offsetY: 0,
            rotate: 0
          },
          title: {
            text: 'mΩ',
            rotate: 0,
            offsetX: -39,
            offsetY: -175
          }
        },
        {
          seriesName: 'V0',
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: '#000'
          },
          labels: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            rotate: 0
          },
          title: {
            text: 'V',
            rotate: 0,
            offsetX: 39,
            offsetY: -175
          }
        },
        {
          show: false,
          seriesName: 'E'
          // axisTicks: {
          //   show: true,
          // },
          // axisBorder: {
          //   show: true,
          //   color: '#000',
          // },
          // labels: {
          //   show: true,
          //   offsetX: 0,
          //   offsetY: 0,
          //   rotate: 0,
          // },
          // title: {
          //   text: 'V2',
          //   rotate: 0,
          //   offsetX: 39,
          //   offsetY: -175,
          // },
        },

        {
          seriesName: 'T',
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: '#000'
          },
          labels: {
            show: true,
            offsetX: -10,
            offsetY: 0,
            rotate: 0
          },
          title: {
            text: '°C',
            rotate: 0,
            offsetX: -39,
            offsetY: -175
          }
        }
      ],
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
        padding: {
          top: 15,
          right: 0,
          bottom: 10,
          left: 20
        },
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
      // legend: {
      //   formatter: function (seriesName, opts) {
      //     // return seriesName + '2121'
      //     return seriesName
      //     // const arr = opts.w.globals.series[0];
      //     // const sum = arr.reduce((a, b) => a + b, 0)
      //     // const one = arr[opts.seriesIndex];
      //     // const percent = ((one / sum) * 100).toFixed(1);
      //     // return (
      //     //   seriesName +
      //     //   ':  ' +
      //     //   percent +
      //     //   '%'
      //     // )
      //   },
      // }
    }
  }

  return (
    <div className='chart-page'>
      <Chart
        options={config.options}
        series={config.series}
        type='line'
        height='425'
        // style={{ minHeight: '400px' }}
      />
    </div>
  )
}
export default ChartPage
