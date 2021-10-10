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
        offsetX: 0,
        offsetY: 0,
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
        show: true,
        position: 'bottom',
        offsetX: -650,
        offsetY: 5,
        itemMargin: {
          horizontal: 17,
          vertical: 0,
        },
        formatter: function (val, opts) {
          return val[0]
        },
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
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#FF1654',
          },
          labels: {
            show: true,
            offsetX: -20,
            offsetY: 0,
            rotate: 0,
          },
          title: {
            text: 'V',
            rotate: 0,
            offsetX: 39,
            offsetY: -175,
          },
        },
        {
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#247BA0',
          },
          labels: {
            show: true,
            offsetX: -20,
            offsetY: 0,
            rotate: 0,
          },
          title: {
            text: 'mΩ',
            rotate: 0,
            offsetX: -39,
            offsetY: -175,
          },
        },
        {
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#247BA0',
          },
          labels: {
            show: true,
            offsetX: -10,
            offsetY: 0,
            rotate: 0,
          },
          title: {
            text: '°C',
            rotate: 0,
            offsetX: -39,
            offsetY: -175,
          },
        },
      ],
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
        padding: {
          top: 15,
          right: 0,
          bottom: 10,
          left: 20,
        },
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
        height="425"
        // style={{ minHeight: '400px' }}
      />
    </div>
  )
}
export default ChartPage
