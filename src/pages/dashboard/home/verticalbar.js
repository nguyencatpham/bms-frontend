import React from 'react'
import Chart from 'react-apexcharts'

const ChartPage = ({ series, labels }) => {
  const config = {
    series: [{
      data: series.map(x => x.data)
    }],
    options: {
      dataLabels: {
        enabled: true,
        textAnchor: 'middle',
        offsetX: 0,
        offsetY: -20,
        style: {
          // fontSize: '14px',
          // fontFamily: 'Helvetica, Arial, sans-serif',
          // fontWeight: 'bold',
          colors: ['#000']
        }
      },
      chart: {
        offsetX: -10,
        offsetY: 10,
        toolbar: {
          show: false
        }
        // type: 'bar',
        // height: 350,
        // stacked: true,
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          columnWidth: '50%',
          horizontal: false,
          distributed: true,

          // barWidth: '10%',

          // vertical: true,
          // barHeight: '100%',
          dataLabels: {
            position: 'top'
            // maxItems: 100,
            // hideOverflowingLabels: true,
            // orientation: horizontal
          }
        }
      },
      grid: {
        show: false,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 40
        }
      },
      stroke: {
        colors: ['transparent'],
        width: 0
      },

      xaxis: {
        categories: series.map((s) => s.name),
        axisBorder: {
          show: true,
          offsetX: -27
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: true
          // offsetX: -6,
        }
      },
      yaxis: {
        forceNiceScale: true,
        max: function (max) {
          return max + 1
        },
        title: {
          text: undefined
        },

        axisBorder: {
          show: true
        }
      },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: function (val) {
            return val
          },
          title: {
            formatter: () => 'Value: '
          }
        }
      },
      fill: {
        opacity: 1
      },
      colors: series.map((s) => s.color),
      legend: {
        horizontalAlign: 'left',
        offsetX: -25,
        // offsetY: 20,
        // width: 300,
        position: 'top',
        fontSize: '15px',
        itemMargin: {
          horizontal: 5,
          vertical: 5,
          backgroundColor: '#eee'
        },
        formatter: function (seriesName, opts) {
          const arr = opts.w.globals.series[0]
          const sum = arr.reduce((a, b) => a + b, 0)
          const one = arr[opts.seriesIndex]
          const percent = sum ? ((one / sum) * 100).toFixed(1) : 0
          return (
            seriesName +
            ':  ' +
            percent +
            '%'
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
        width='100%'
        options={config.options}
        series={config.series}
        type='bar'
        height='360'
        // style={{ minHeight: '400px' }}
      />
    </div>
  )
}
export default ChartPage
