import React from 'react'
import Chart from 'react-apexcharts'

const ChartPage = ({ series, labels }) => {
  const config = {
    series,
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
          colors: ['#000'],
        },
      },
      chart: {
        offsetX: -10,
        offsetY: 10,
        toolbar: {
          show: false,
        },
        // type: 'bar',
        // height: 350,
        // stacked: true,
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          columnWidth: '100%',
          horizontal: false,
          // barWidth: '10%',

          // vertical: true,
          // barHeight: '100%',
          dataLabels: {
            position: 'top',
            // maxItems: 100,
            // hideOverflowingLabels: true,
            // orientation: horizontal
          },
        },
      },
      grid: {
        show: false,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 40,
        },
      },
      stroke: {
        colors: ['transparent'],
        width: 37,
      },

      xaxis: {
        categories: series.map((s) => s.name),
        labels: {},
        axisBorder: {
          show: true,
          offsetX: -27,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
          offsetX: -6,
        },
      },
      yaxis: {
        forceNiceScale: true,
        max: function (max) {
          return max + 1
        },
        title: {
          text: undefined,
        },

        axisBorder: {
          show: true,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val
          },
        },
      },
      fill: {
        opacity: 1,
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
          backgroundColor: '#eee',
        },
        formatter: function (seriesName, opts) {
          // return seriesName + '2121'
          // console.log(opts.w.globals);
          return (
            seriesName +
            ':  ' +
            `${(opts.w.globals.seriesPercent[opts.seriesIndex] * 1).toFixed(1)}` +
            '%'
          )
        },
        markers: {
          width: 12,
          height: 12,
          radius: '50%',
        },
        // horizontalAlign: 'left',
        // offsetX: 40
      },
    },
  }
  return (
    <div className="chart-page">
      <Chart
        options={config.options}
        series={config.series}
        type="bar"
        height="390"
        // style={{ minHeight: '400px' }}
      />
    </div>
  )
}
export default ChartPage
