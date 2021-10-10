import { height } from 'dom-helpers'
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
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        // width: [5, 7, 5],
        width: 3,
        curve: 'straight',
        // dashArray: [0, 8, 5]
      },
      colors: series.map((s) => s.color),
      legend: {
        show: false,
        // tooltipHoverFormatter: function (val, opts) {
        //   return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
        // },
      },
      markers: {
        size: 5,
        hover: {
          size: 7,
        },
      },
      xaxis: {
        categories: [
          '14:10',
          '14:20',
          '14:30',
          '14:40',
          '14:50',
          '15:00',
          '15:10',
          '15:20',
          '15:30',
          '15:40',
          '15:50',
          '16:00',
        ],
      },
      tooltip: {
        theme: 'dark',
        y: [
          {
            title: {
              formatter: function (val) {
                return val + '<span style="margin-right: 2rem;"></span>'
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + '<span style="margin-right: 2rem;"></span>'
                return val
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + '<span style="margin-right: 2rem;"></span>'
                return val
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + '<span style="margin-right: 2rem;"></span>'
                return val
              },
            },
          },
        ],
      },
      grid: {
        borderColor: '#eee',
        // borderColor: '#f1f1f1',
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
    },
  }

  return (
    <div className="chart-page">
      <Chart
        options={config.options}
        series={config.series}
        type="line"
        height="455"
        // style={{ minHeight: '400px' }}
      />
    </div>
  )
}
export default ChartPage
