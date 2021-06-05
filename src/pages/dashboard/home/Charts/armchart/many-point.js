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
    const chart = am4core.create('chartdiv-many-point', am4charts.XYChart)
    chart.paddingRight = 20

    const data = []
    let visits = 10
    for (var i = 1; i < 50000; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10)
      data.push({ date: new Date(2018, 0, i), value: visits })
    }

    chart.data = data

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.grid.template.location = 0
    dateAxis.minZoomCount = 5

    // this makes the data to be grouped
    dateAxis.groupData = true
    dateAxis.groupCount = 500

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())

    const series = chart.series.push(new am4charts.LineSeries())
    series.dataFields.dateX = 'date'
    series.dataFields.valueY = 'value'
    series.tooltipText = '{valueY}'
    series.tooltip.pointerOrientation = 'vertical'
    series.tooltip.background.fillOpacity = 0.5

    chart.cursor = new am4charts.XYCursor()
    chart.cursor.xAxis = dateAxis

    const scrollbarX = new am4core.Scrollbar()
    scrollbarX.marginBottom = 20
    chart.scrollbarX = scrollbarX
    return () => {
      chart.dispose()
    }
  }, [])
  return (
    <>
      <div id='chartdiv-many-point' style={{ width: '100%', height: '500px' }} />
    </>
  )
}
export default DefaultPage
