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
    const chart = am4core.create('chartdiv-dumbell', am4charts.XYChart)

    const data = []
    let open = 100
    let close = 120

    const names = [
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00'
    ]

    for (var i = 0; i < names.length; i++) {
      open += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5)
      close = open + Math.round(Math.random() * 10) + 3
      data.push({ category: names[i], open: open, close: close })
    }

    chart.data = data
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    categoryAxis.renderer.grid.template.location = 0
    categoryAxis.dataFields.category = 'category'
    categoryAxis.renderer.minGridDistance = 15
    categoryAxis.renderer.grid.template.location = 0.5
    categoryAxis.renderer.grid.template.strokeDasharray = '1,3'
    categoryAxis.renderer.labels.template.rotation = -90
    categoryAxis.renderer.labels.template.horizontalCenter = 'left'
    categoryAxis.renderer.labels.template.location = 0.5
    categoryAxis.renderer.inside = true

    categoryAxis.renderer.labels.template.adapter.add('dx', function (dx, target) {
      return -target.maxRight / 2
    })

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.tooltip.disabled = true
    valueAxis.renderer.ticks.template.disabled = true
    valueAxis.renderer.axisFills.template.disabled = true

    const series = chart.series.push(new am4charts.ColumnSeries())
    series.dataFields.categoryX = 'category'
    series.dataFields.openValueY = 'open'
    series.dataFields.valueY = 'close'
    series.tooltipText = 'online: {openValueY.value} offline: {valueY.value}'
    series.sequencedInterpolation = true
    series.fillOpacity = 0
    series.strokeOpacity = 1
    series.columns.template.width = 0.01
    series.tooltip.pointerOrientation = 'horizontal'

    const openBullet = series.bullets.create(am4charts.CircleBullet)
    openBullet.locationY = 1

    const closeBullet = series.bullets.create(am4charts.CircleBullet)

    closeBullet.fill = chart.colors.getIndex(4)
    closeBullet.stroke = closeBullet.fill

    chart.cursor = new am4charts.XYCursor()

    chart.scrollbarX = new am4core.Scrollbar()
    chart.scrollbarY = new am4core.Scrollbar()
    return () => {
      chart.dispose()
    }
  }, [])
  return (
    <>
      <div id='chartdiv-dumbell' style={{ width: '100%', height: '500px' }} />
    </>
  )
}
export default DefaultPage
