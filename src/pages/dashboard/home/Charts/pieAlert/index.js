import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import style from './style.module.scss'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Chart9 = (stats = {}) => {
  const { normal = 0, warning = 0, alert = 0 } = stats
  const chartComponent = useRef(null)
  const [options, setChartOptions] = useState({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
      text: 'Thống kê<br>Cảnh báo<br>',
      align: 'center',
      verticalAlign: 'middle',
      y: 60
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white'
          }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '110%'
      }
    },
    series: [{
      type: 'pie',
      name: 'Blocks',
      innerSize: '50%',
      data: [
        ['Chrome', 58.9],
        ['Firefox', 13.29],
        ['Internet Explorer', 13],
        ['Edge', 3.78],
        ['Safari', 3.42],
        {
          name: 'Other',
          y: 7.61,
          dataLabels: {
            enabled: false
          }
        }
      ]
    }]
  })
  useEffect(() => {
    const series = [{
      type: 'pie',
      name: 'Blocks',
      innerSize: '50%',
      data: [
        ['Bình thường', normal],
        ['Cảnh báo', warning],
        ['Báo động', alert]
      ]
    }]

    setChartOptions({ ...options, series })
  }, [stats])
  return (
    <div>
      <div className='text-dark font-size-18 font-weight-bold mb-1'>Thống kê cảnh báo conto</div>
      <div className='text-gray-6 mb-2'>Thống kê cảnh báo của bình ắc quy.</div>
      <div className='d-flex flex-wrap align-items-center'>
        <div className='mr-3 mt-3 mb-3 position-relative'>
          <HighchartsReact ref={chartComponent} highcharts={Highcharts} options={options} />
          <div className={`${style.tooltip} text-gray-5 font-size-28`} />
        </div>
      </div>
    </div>
  )
}

export default Chart9
