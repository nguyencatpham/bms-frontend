import React, { useLayoutEffect, useRef } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import style from './style.module.scss'

am4core.useTheme(am4themesAnimated)

const Chart9 = () => {
  const tooltip = React.createRef()
  const chart = useRef(null)

  useLayoutEffect(() => {
    const armChart = am4core.create('chartdiv', am4charts.XYChart)
    const data = [{
      country: 'Lithuania',
      litres: 501.9
    }, {
      country: 'Czechia',
      litres: 301.9
    }, {
      country: 'Ireland',
      litres: 201.1
    }, {
      country: 'Germany',
      litres: 165.8
    }, {
      country: 'Australia',
      litres: 139.9
    }, {
      country: 'Austria',
      litres: 128.3
    }, {
      country: 'UK',
      litres: 99
    }, {
      country: 'Belgium',
      litres: 60
    }, {
      country: 'The Netherlands',
      litres: 50
    }]
    chart.current = armChart
    chart.current.data = data
    // Set inner radius
    chart.current.innerRadius = am4core.percent(50)

    // Add and configure Series
    const pieSeries = chart.current.series.push(new am4charts.PieSeries())
    pieSeries.dataFields.value = 'litres'
    pieSeries.dataFields.category = 'country'
    pieSeries.slices.template.stroke = am4core.color('#fff')
    pieSeries.slices.template.strokeWidth = 2
    pieSeries.slices.template.strokeOpacity = 1

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1
    pieSeries.hiddenState.properties.endAngle = -90
    pieSeries.hiddenState.properties.startAngle = -90

    return () => {
      armChart.dispose()
    }
  }, [])

  return (
    <div>
      <div className='text-dark font-size-18 font-weight-bold mb-1'>Thống kê cảnh báo</div>
      <div className='text-gray-6 mb-2'>Thống kê cảnh báo của bình ắc quy.</div>
      <div className='d-flex flex-wrap align-items-center'>
        <div className='mr-3 mt-3 mb-3 position-relative'>
          <div id='chartdiv' style={{ width: '100%', height: '500px' }} />
          <div className={`${style.tooltip} text-gray-5 font-size-28`} ref={tooltip} />
        </div>
      </div>
    </div>
  )
}

export default Chart9
