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
    const chart = am4core.create('chartdiv-axisbreack', am4charts.XYChart)
    chart.hiddenState.properties.opacity = 0 // this creates initial fade-in

    chart.data = [
      {
        country: 'Tháng 1',
        visits: 23725
      },
      {
        country: 'Tháng 2',
        visits: 1882
      },
      {
        country: 'Tháng 3',
        visits: 1809
      },
      {
        country: 'Tháng 4',
        visits: 1322
      },
      {
        country: 'Tháng 5',
        visits: 1122
      },
      {
        country: 'Tháng 6',
        visits: 1114
      },
      {
        country: 'Tháng 7',
        visits: 984
      },
      {
        country: 'Tháng 8',
        visits: 711
      },
      {
        country: 'Tháng 9',
        visits: 665
      },
      {
        country: 'Tháng 10',
        visits: 580
      },
      {
        country: 'Tháng 11',
        visits: 443
      },
      {
        country: 'Tháng 12',
        visits: 441
      }
    ]

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    categoryAxis.renderer.grid.template.location = 0
    categoryAxis.dataFields.category = 'country'
    categoryAxis.renderer.minGridDistance = 40
    categoryAxis.fontSize = 11

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.min = 0
    valueAxis.max = 24000
    valueAxis.strictMinMax = true
    valueAxis.renderer.minGridDistance = 30
    // axis break
    const axisBreak = valueAxis.axisBreaks.create()
    axisBreak.startValue = 2100
    axisBreak.endValue = 22900
    // axisBreak.breakSize = 0.005;

    // fixed axis break
    const d = (axisBreak.endValue - axisBreak.startValue) / (valueAxis.max - valueAxis.min)
    axisBreak.breakSize = 0.05 * (1 - d) / d // 0.05 means that the break will take 5% of the total value axis height

    // make break expand on hover
    const hoverState = axisBreak.states.create('hover')
    hoverState.properties.breakSize = 1
    hoverState.properties.opacity = 0.1
    hoverState.transitionDuration = 1500

    axisBreak.defaultState.transitionDuration = 1000
    /*
// this is exactly the same, but with events
axisBreak.events.on("over", function() {
  axisBreak.animate(
    [{ property: "breakSize", to: 1 }, { property: "opacity", to: 0.1 }],
    1500,
    am4core.ease.sinOut
  );
});
axisBreak.events.on("out", function() {
  axisBreak.animate(
    [{ property: "breakSize", to: 0.005 }, { property: "opacity", to: 1 }],
    1000,
    am4core.ease.quadOut
  );
}); */

    const series = chart.series.push(new am4charts.ColumnSeries())
    series.dataFields.categoryX = 'country'
    series.dataFields.valueY = 'visits'
    series.columns.template.tooltipText = '{valueY.value}'
    series.columns.template.tooltipY = 0
    series.columns.template.strokeOpacity = 0

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add('fill', function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index)
    })
    return () => {
      chart.dispose()
    }
  }, [])
  return (
    <>
      <div id='chartdiv-axisbreack' style={{ width: '100%', height: '500px' }} />
    </>
  )
}
export default DefaultPage
