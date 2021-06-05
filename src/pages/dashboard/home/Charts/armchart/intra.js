/* Imports */
import React, { useLayoutEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated)
// Themes end

const DefaultPage = ({ stats, user, dispatch }) => {
  useLayoutEffect(() => {
    // Create chart instance
    const chart = am4core.create('chartdiv-intra', am4charts.XYChart)

    // Create daily series and related axes
    const dateAxis1 = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis1.renderer.grid.template.location = 0
    dateAxis1.renderer.minGridDistance = 40

    const valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis())

    const series1 = chart.series.push(new am4charts.ColumnSeries())
    series1.dataFields.valueY = 'value'
    series1.dataFields.dateX = 'date'
    series1.data = generateDailyData()
    series1.xAxis = dateAxis1
    series1.yAxis = valueAxis1
    series1.tooltipText = '{dateX}: [bold]{valueY}[/]'

    // Create hourly series and related axes
    const dateAxis2 = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis2.renderer.grid.template.location = 0
    dateAxis2.renderer.minGridDistance = 40
    dateAxis2.renderer.labels.template.disabled = true
    dateAxis2.renderer.grid.template.disabled = true
    dateAxis2.renderer.tooltip.disabled = true

    const valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis2.renderer.opposite = true
    valueAxis2.renderer.grid.template.disabled = true
    valueAxis2.renderer.labels.template.disabled = true
    valueAxis2.renderer.tooltip.disabled = true

    const series2 = chart.series.push(new am4charts.LineSeries())
    series2.dataFields.valueY = 'value'
    series2.dataFields.dateX = 'date'
    series2.data = generateHourlyData()
    series2.xAxis = dateAxis2
    series2.yAxis = valueAxis2
    series2.strokeWidth = 3
    series2.tooltipText = "{dateX.formatDate('yyyy-MM-dd hh:00')}: [bold]{valueY}[/]"

    // Add cursor
    chart.cursor = new am4charts.XYCursor()
    return () => {
      chart.dispose()
    }
  }, [])
  function generateDailyData () {
    const firstDate = new Date()
    firstDate.setDate(firstDate.getDate() - 10)
    firstDate.setHours(0, 0, 0, 0)
    const data = []
    for (var i = 0; i < 10; i++) {
      const newDate = new Date(firstDate)
      newDate.setDate(newDate.getDate() + i)
      data.push({
        date: newDate,
        value: Math.round(Math.random() * 12) + 1
      })
    }
    return data
  }

  function generateHourlyData () {
    const firstDate = new Date()
    firstDate.setDate(firstDate.getDate() - 10)
    const data = []
    for (var i = 0; i < 10 * 24; i++) {
      const newDate = new Date(firstDate)
      newDate.setHours(newDate.getHours() + i)

      let value = Math.round(data[data.length - 1].value / 100 * (90 + Math.round(Math.random() * 20)) * 100) / 100
      if (i === 0) {
        value = Math.round(Math.random() * 10) + 1
      }
      data.push({
        date: newDate,
        value: value
      })
    }
    return data
  }
  return (
    <>
      <div id='chartdiv-intra' style={{ width: '100%', height: '500px' }} />
    </>
  )
}
export default DefaultPage
