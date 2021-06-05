/* Imports */
import React, { useLayoutEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated)
// Themes end

// Create chart instance
const DefaultPage = ({ stats, user, dispatch }) => {
  useLayoutEffect(() => {
    const chart = am4core.create('chartdiv-pareto', am4charts.XYChart)
    chart.scrollbarX = new am4core.Scrollbar()

    // Add data
    chart.data = [{
      country: 'System 01',
      visits: 3025
    }, {
      country: 'System 02',
      visits: 1882
    }, {
      country: 'System 03',
      visits: 1809
    }, {
      country: 'System 04',
      visits: 1322
    }, {
      country: 'System 05',
      visits: 1122
    }, {
      country: 'System 06',
      visits: 1114
    }, {
      country: 'System 07',
      visits: 984
    }, {
      country: 'System 08',
      visits: 711
    }, {
      country: 'System 09',
      visits: 665
    }]

    prepareParetoData()

    function prepareParetoData () {
      let total = 0

      for (var i = 0; i < chart.data.length; i++) {
        const value = chart.data[i].visits
        total += value
      }

      let sum = 0
      for (var i = 0; i < chart.data.length; i++) {
        const value = chart.data[i].visits
        sum += value
        chart.data[i].pareto = sum / total * 100
      }
    }

    // Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    categoryAxis.dataFields.category = 'country'
    categoryAxis.renderer.grid.template.location = 0
    categoryAxis.renderer.minGridDistance = 60
    categoryAxis.tooltip.disabled = true

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.renderer.minWidth = 50
    valueAxis.min = 0
    valueAxis.cursorTooltipEnabled = false

    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries())
    series.sequencedInterpolation = true
    series.dataFields.valueY = 'visits'
    series.dataFields.categoryX = 'country'
    series.tooltipText = '[{categoryX}: bold]{valueY}[/]'
    series.columns.template.strokeWidth = 0

    series.tooltip.pointerOrientation = 'vertical'

    series.columns.template.column.cornerRadiusTopLeft = 10
    series.columns.template.column.cornerRadiusTopRight = 10
    series.columns.template.column.fillOpacity = 0.8

    // on hover, make corner radiuses bigger
    const hoverState = series.columns.template.column.states.create('hover')
    hoverState.properties.cornerRadiusTopLeft = 0
    hoverState.properties.cornerRadiusTopRight = 0
    hoverState.properties.fillOpacity = 1

    series.columns.template.adapter.add('fill', function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index)
    })

    const paretoValueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    paretoValueAxis.renderer.opposite = true
    paretoValueAxis.min = 0
    paretoValueAxis.max = 100
    paretoValueAxis.strictMinMax = true
    paretoValueAxis.renderer.grid.template.disabled = true
    paretoValueAxis.numberFormatter = new am4core.NumberFormatter()
    paretoValueAxis.numberFormatter.numberFormat = "#'%'"
    paretoValueAxis.cursorTooltipEnabled = false

    const paretoSeries = chart.series.push(new am4charts.LineSeries())
    paretoSeries.dataFields.valueY = 'pareto'
    paretoSeries.dataFields.categoryX = 'country'
    paretoSeries.yAxis = paretoValueAxis
    paretoSeries.tooltipText = "warning: {valueY.formatNumber('#.0')}%[/]"
    paretoSeries.bullets.push(new am4charts.CircleBullet())
    paretoSeries.strokeWidth = 2
    paretoSeries.stroke = new am4core.InterfaceColorSet().getFor('alternativeBackground')
    paretoSeries.strokeOpacity = 0.5

    // Cursor
    chart.cursor = new am4charts.XYCursor()
    chart.cursor.behavior = 'panX'
    return () => {
      chart.dispose()
    }
  }, [])
  return (
    <>
      <div id='chartdiv-pareto' style={{ width: '100%', height: '500px' }} />
    </>
  )
}
export default DefaultPage
