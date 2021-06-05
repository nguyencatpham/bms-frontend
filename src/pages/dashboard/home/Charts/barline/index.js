import React, { useEffect, useRef, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themesAnimated)

const mapStateToProps = ({ user, block, dispatch }) => {
  const { stats = [] } = block
  return { stats, user, dispatch }
}
const DefaultPage = ({ stats, user, dispatch }) => {
  const chart = useRef(null)

  useLayoutEffect(() => {
    const armChart = am4core.create('chartdiv', am4charts.XYChart)
    const data = []
    let visits = 10
    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10)
      data.push({ timestamp: new Date(2018, 0, i), name: 'name' + i, v0: visits })
    }

    chart.current = armChart
    // chart.current.data = data
    chart.current.data = stats.map(({ timestamp, v0, e, soc, r, t }) => ({ timestamp: new Date(timestamp), v0, e, soc, r, t }))
    chart.current.paddingRight = 20
    // Create axes
    const dateAxis = chart.current.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.minGridDistance = 40
    dateAxis.renderer.grid.template.location = 0
    dateAxis.minZoomCount = 5
    // this makes the data to be grouped
    dateAxis.groupData = true

    // Create hourly series and related axes
    const dateAxis2 = chart.current.xAxes.push(new am4charts.DateAxis())
    dateAxis2.renderer.grid.template.location = 0
    dateAxis2.renderer.minGridDistance = 40
    dateAxis2.renderer.labels.template.disabled = true
    dateAxis2.renderer.grid.template.disabled = true
    dateAxis2.renderer.tooltip.disabled = true

    const valueAxis = chart.current.yAxes.push(new am4charts.ValueAxis())
    if (chart.current.yAxes.indexOf(valueAxis) !== 0) {
      valueAxis.syncWithAxis = chart.current.yAxes.getIndex(0)
    }

    createAxisAndSeries(valueAxis, 'a', 'Báo động', false)

    const valueAxis2 = chart.current.yAxes.push(new am4charts.ValueAxis())
    valueAxis2.renderer.opposite = true
    valueAxis2.renderer.grid.template.disabled = true
    valueAxis2.renderer.labels.template.disabled = true
    valueAxis2.renderer.tooltip.disabled = true
    createAxisAndSeries(valueAxis2, 'w', 'Cảnh báo', false)

    chart.current.cursor = new am4charts.XYCursor()
    chart.current.cursor.xAxis = dateAxis
    chart.current.legend = new am4charts.Legend()
    const scrollbarX = new am4core.Scrollbar()
    scrollbarX.marginBottom = 20
    chart.current.scrollbarX = scrollbarX

    return () => {
      armChart.dispose()
    }
  }, [])
  useLayoutEffect(() => {
    chart.current.data = stats.map(({ day, warning, alert }) => ({ timestamp: day, warning, alert }))
  }, [stats])

  useEffect(() => {
    dispatch({
      type: 'block/STATS',
      payload: {}
    })
  }, [user.id, dispatch])

  // Create series
  const createAxisAndSeries = (valueAxis, field, name, opposite) => {
    const series = chart.current.series.push(new am4charts.ColumnSeries())
    series.dataFields.dateX = 'timestamp'
    series.dataFields.valueY = field
    series.tooltipText = '{name}: [bold]{valueY}[/]'
    series.tooltip.pointerOrientation = 'vertical'
    series.tooltip.background.fillOpacity = 0.5
    series.tooltip.background.fill = am4core.color('#fff')
    series.tooltip.label.fill = am4core.color('#000')

    series.name = name
    series.yAxis = valueAxis
    series.showOnInit = true

    valueAxis.renderer.line.strokeOpacity = 1
    valueAxis.renderer.line.stroke = series.stroke
    valueAxis.renderer.labels.template.fill = series.stroke
    valueAxis.renderer.opposite = opposite
  }

  return (
    <>
      <div id='chartdiv' style={{ width: '100%', height: '500px' }} />
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
