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
    const container = am4core.create('chartdiv-piepie', am4core.Container)
    container.width = am4core.percent(100)
    container.height = am4core.percent(100)
    container.layout = 'horizontal'

    const chart = container.createChild(am4charts.PieChart)

    // Add data
    chart.data = [{
      country: 'Quận 1',
      litres: 500,
      subData: [{ name: 'A', value: 200 }, { name: 'B', value: 150 }, { name: 'C', value: 100 }, { name: 'D', value: 50 }]
    }, {
      country: 'Quận 2',
      litres: 300,
      subData: [{ name: 'A', value: 150 }, { name: 'B', value: 100 }, { name: 'C', value: 50 }]
    }, {
      country: 'Quận 3',
      litres: 200,
      subData: [{ name: 'A', value: 110 }, { name: 'B', value: 60 }, { name: 'C', value: 30 }]
    }, {
      country: 'Quận 4',
      litres: 150,
      subData: [{ name: 'A', value: 80 }, { name: 'B', value: 40 }, { name: 'C', value: 30 }]
    }, {
      country: 'Quận 5',
      litres: 140,
      subData: [{ name: 'A', value: 90 }, { name: 'B', value: 40 }, { name: 'C', value: 10 }]
    }, {
      country: 'Quận 6',
      litres: 120,
      subData: [{ name: 'A', value: 60 }, { name: 'B', value: 30 }, { name: 'C', value: 30 }]
    }]

    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries())
    pieSeries.dataFields.value = 'litres'
    pieSeries.dataFields.category = 'country'
    pieSeries.slices.template.states.getKey('active').properties.shiftRadius = 0
    // pieSeries.labels.template.text = "{category}\n{value.percent.formatNumber('#.#')}%";

    pieSeries.slices.template.events.on('hit', function (event) {
      selectSlice(event.target.dataItem)
    })

    const chart2 = container.createChild(am4charts.PieChart)
    chart2.width = am4core.percent(30)
    chart2.radius = am4core.percent(80)

    // Add and configure Series
    const pieSeries2 = chart2.series.push(new am4charts.PieSeries())
    pieSeries2.dataFields.value = 'value'
    pieSeries2.dataFields.category = 'name'
    pieSeries2.slices.template.states.getKey('active').properties.shiftRadius = 0
    // pieSeries2.labels.template.radius = am4core.percent(50);
    // pieSeries2.labels.template.inside = true;
    // pieSeries2.labels.template.fill = am4core.color("#ffffff");
    pieSeries2.labels.template.disabled = true
    pieSeries2.ticks.template.disabled = true
    pieSeries2.alignLabels = false
    pieSeries2.events.on('positionchanged', updateLines)

    const interfaceColors = new am4core.InterfaceColorSet()

    const line1 = container.createChild(am4core.Line)
    line1.strokeDasharray = '2,2'
    line1.strokeOpacity = 0.5
    line1.stroke = interfaceColors.getFor('alternativeBackground')
    line1.isMeasured = false

    const line2 = container.createChild(am4core.Line)
    line2.strokeDasharray = '2,2'
    line2.strokeOpacity = 0.5
    line2.stroke = interfaceColors.getFor('alternativeBackground')
    line2.isMeasured = false

    let selectedSlice

    function selectSlice (dataItem) {
      selectedSlice = dataItem.slice

      const fill = selectedSlice.fill

      const count = dataItem.dataContext.subData.length
      pieSeries2.colors.list = []
      for (var i = 0; i < count; i++) {
        pieSeries2.colors.list.push(fill.brighten(i * 2 / count))
      }

      chart2.data = dataItem.dataContext.subData
      pieSeries2.appear()

      const middleAngle = selectedSlice.middleAngle
      const firstAngle = pieSeries.slices.getIndex(0).startAngle
      const animation = pieSeries.animate([{ property: 'startAngle', to: firstAngle - middleAngle }, { property: 'endAngle', to: firstAngle - middleAngle + 360 }], 600, am4core.ease.sinOut)
      animation.events.on('animationprogress', updateLines)

      selectedSlice.events.on('transformed', updateLines)

    //  var animation = chart2.animate({property:"dx", from:-container.pixelWidth / 2, to:0}, 2000, am4core.ease.elasticOut)
    //  animation.events.on("animationprogress", updateLines)
    }

    function updateLines () {
      if (selectedSlice) {
        let p11 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle) }
        let p12 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle + selectedSlice.arc), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle + selectedSlice.arc) }

        p11 = am4core.utils.spritePointToSvg(p11, selectedSlice)
        p12 = am4core.utils.spritePointToSvg(p12, selectedSlice)

        let p21 = { x: 0, y: -pieSeries2.pixelRadius }
        let p22 = { x: 0, y: pieSeries2.pixelRadius }

        p21 = am4core.utils.spritePointToSvg(p21, pieSeries2)
        p22 = am4core.utils.spritePointToSvg(p22, pieSeries2)

        line1.x1 = p11.x
        line1.x2 = p21.x
        line1.y1 = p11.y
        line1.y2 = p21.y

        line2.x1 = p12.x
        line2.x2 = p22.x
        line2.y1 = p12.y
        line2.y2 = p22.y
      }
    }

    chart.events.on('datavalidated', function () {
      setTimeout(function () {
        selectSlice(pieSeries.dataItems.getIndex(0))
      }, 1000)
    })
    return () => {
      chart.dispose()
    }
  }, [])
  return (
    <>
      <div id='chartdiv-piepie' style={{ width: '100%', height: '500px' }} />
    </>
  )
}
export default DefaultPage
