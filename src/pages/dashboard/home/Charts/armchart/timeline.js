/* Imports */
import React, { useLayoutEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated)
// Themes end

/**
 * Define data for each year
 */
const DefaultPage = ({ stats, user, dispatch }) => {
  useLayoutEffect(() => {
    const chartData = {
      1995: [
        { sector: 'Mất kết nối', size: 6.6 },
        { sector: 'Điện trở vượt định mức', size: 0.6 },
        { sector: 'Điện áp trôi vượt định mức', size: 23.2 },
        { sector: 'Điện áp trôi thấp hơn định mức', size: 2.2 },
        { sector: 'Điện áp hở mạch vượt định mức', size: 4.5 },
        { sector: 'Điện áp hở mạch tháp hơn định mức', size: 14.6 },
        { sector: 'Nhiệt độ vượt quá định mức', size: 9.3 },
        { sector: 'Nhiệt độ thấp hơn định mức', size: 22.5 }],
      1996: [
        { sector: 'Mất kết nối', size: 6.4 },
        { sector: 'Điện trở vượt định mức', size: 0.5 },
        { sector: 'Điện áp trôi vượt định mức', size: 22.4 },
        { sector: 'Điện áp trôi thấp hơn định mức', size: 2 },
        { sector: 'Điện áp hở mạch vượt định mức', size: 4.2 },
        { sector: 'Điện áp hở mạch tháp hơn định mức', size: 14.8 },
        { sector: 'Nhiệt độ vượt quá định mức', size: 9.7 },
        { sector: 'Nhiệt độ thấp hơn định mức', size: 22 }],
      1997: [
        { sector: 'Mất kết nối', size: 6.1 },
        { sector: 'Điện trở vượt định mức', size: 0.2 },
        { sector: 'Điện áp trôi vượt định mức', size: 20.9 },
        { sector: 'Điện áp trôi thấp hơn định mức', size: 1.8 },
        { sector: 'Điện áp hở mạch vượt định mức', size: 4.2 },
        { sector: 'Điện áp hở mạch tháp hơn định mức', size: 13.7 },
        { sector: 'Nhiệt độ vượt quá định mức', size: 9.4 },
        { sector: 'Nhiệt độ thấp hơn định mức', size: 22.1 }],
      1998: [
        { sector: 'Mất kết nối', size: 6.2 },
        { sector: 'Điện trở vượt định mức', size: 0.3 },
        { sector: 'Điện áp trôi vượt định mức', size: 21.4 },
        { sector: 'Điện áp trôi thấp hơn định mức', size: 1.9 },
        { sector: 'Điện áp hở mạch vượt định mức', size: 4.2 },
        { sector: 'Điện áp hở mạch tháp hơn định mức', size: 14.5 },
        { sector: 'Nhiệt độ vượt quá định mức', size: 10.6 },
        { sector: 'Nhiệt độ thấp hơn định mức', size: 23 }],
      1999: [
        { sector: 'Mất kết nối', size: 5.7 },
        { sector: 'Điện trở vượt định mức', size: 0.2 },
        { sector: 'Điện áp trôi vượt định mức', size: 20 },
        { sector: 'Điện áp trôi thấp hơn định mức', size: 1.8 },
        { sector: 'Điện áp hở mạch vượt định mức', size: 4.4 },
        { sector: 'Điện áp hở mạch tháp hơn định mức', size: 15.2 },
        { sector: 'Nhiệt độ vượt quá định mức', size: 10.5 },
        { sector: 'Nhiệt độ thấp hơn định mức', size: 24.7 }],
      2000: [
        { sector: 'Mất kết nối', size: 5.1 },
        { sector: 'Điện trở vượt định mức', size: 0.3 },
        { sector: 'Điện áp trôi vượt định mức', size: 20.4 },
        { sector: 'Điện áp trôi thấp hơn định mức', size: 1.7 },
        { sector: 'Điện áp hở mạch vượt định mức', size: 4 },
        { sector: 'Điện áp hở mạch tháp hơn định mức', size: 16.3 },
        { sector: 'Nhiệt độ vượt quá định mức', size: 10.7 },
        { sector: 'Nhiệt độ thấp hơn định mức', size: 24.6 }],
      2001: [
        { sector: 'Mất kết nối', size: 5.5 },
        { sector: 'Điện trở vượt định mức', size: 0.2 },
        { sector: 'Điện áp trôi vượt định mức', size: 20.3 },
        { sector: 'Điện áp trôi thấp hơn định mức', size: 1.6 },
        { sector: 'Điện áp hở mạch vượt định mức', size: 3.1 },
        { sector: 'Điện áp hở mạch tháp hơn định mức', size: 16.3 },
        { sector: 'Nhiệt độ vượt quá định mức', size: 10.7 },
        { sector: 'Nhiệt độ thấp hơn định mức', size: 25.8 }],
      2002: [
        { sector: 'Mất kết nối', size: 5.7 },
        { sector: 'Điện trở vượt định mức', size: 0.2 },
        { sector: 'Điện áp trôi vượt định mức', size: 20.5 },
        { sector: 'Điện áp trôi thấp hơn định mức', size: 1.6 },
        { sector: 'Điện áp hở mạch vượt định mức', size: 3.6 },
        { sector: 'Điện áp hở mạch tháp hơn định mức', size: 16.1 },
        { sector: 'Nhiệt độ vượt quá định mức', size: 10.7 },
        { sector: 'Nhiệt độ thấp hơn định mức', size: 26 }],
      2003: [
        { sector: 'Mất kết nối', size: 4.9 },
        { sector: 'Điện trở vượt định mức', size: 0.2 },
        { sector: 'Điện áp trôi vượt định mức', size: 19.4 },
        { sector: 'Điện áp trôi thấp hơn định mức', size: 1.5 },
        { sector: 'Điện áp hở mạch vượt định mức', size: 3.3 },
        { sector: 'Điện áp hở mạch tháp hơn định mức', size: 16.2 },
        { sector: 'Nhiệt độ vượt quá định mức', size: 11 },
        { sector: 'Nhiệt độ thấp hơn định mức', size: 27.5 }],
      2004: [
        { sector: 'Mất kết nối', size: 4.7 },
        { sector: 'Điện trở vượt định mức', size: 0.2 },
        { sector: 'Điện áp trôi vượt định mức', size: 18.4 },
        { sector: 'Điện áp trôi thấp hơn định mức', size: 1.4 },
        { sector: 'Điện áp hở mạch vượt định mức', size: 3.3 },
        { sector: 'Điện áp hở mạch tháp hơn định mức', size: 16.9 },
        { sector: 'Nhiệt độ vượt quá định mức', size: 10.6 },
        { sector: 'Nhiệt độ thấp hơn định mức', size: 28.1 }],
      2005: [
        { sector: 'Mất kết nối', size: 4.3 },
        { sector: 'Điện trở vượt định mức', size: 0.2 },
        { sector: 'Điện áp trôi vượt định mức', size: 18.1 },
        { sector: 'Điện áp trôi thấp hơn định mức', size: 1.4 },
        { sector: 'Điện áp hở mạch vượt định mức', size: 3.9 },
        { sector: 'Điện áp hở mạch tháp hơn định mức', size: 15.7 },
        { sector: 'Nhiệt độ vượt quá định mức', size: 10.6 },
        { sector: 'Nhiệt độ thấp hơn định mức', size: 29.1 }],
      2006: [
        { sector: 'Mất kết nối', size: 4 },
        { sector: 'Điện trở vượt định mức', size: 0.2 },
        { sector: 'Điện áp trôi vượt định mức', size: 16.5 },
        { sector: 'Điện áp trôi thấp hơn định mức', size: 1.3 },
        { sector: 'Điện áp hở mạch vượt định mức', size: 3.7 },
        { sector: 'Điện áp hở mạch tháp hơn định mức', size: 14.2 },
        { sector: 'Nhiệt độ vượt quá định mức', size: 12.1 },
        { sector: 'Nhiệt độ thấp hơn định mức', size: 29.1 }],
      2007: [
        { sector: 'Mất kết nối', size: 4.7 },
        { sector: 'Điện trở vượt định mức', size: 0.2 },
        { sector: 'Điện áp trôi vượt định mức', size: 16.2 },
        { sector: 'Điện áp trôi thấp hơn định mức', size: 1.2 },
        { sector: 'Điện áp hở mạch vượt định mức', size: 4.1 },
        { sector: 'Điện áp hở mạch tháp hơn định mức', size: 15.6 },
        { sector: 'Nhiệt độ vượt quá định mức', size: 11.2 },
        { sector: 'Nhiệt độ thấp hơn định mức', size: 30.4 }],
      2008: [
        { sector: 'Mất kết nối', size: 4.9 },
        { sector: 'Điện trở vượt định mức', size: 0.3 },
        { sector: 'Điện áp trôi vượt định mức', size: 17.2 },
        { sector: 'Điện áp trôi thấp hơn định mức', size: 1.4 },
        { sector: 'Điện áp hở mạch vượt định mức', size: 5.1 },
        { sector: 'Điện áp hở mạch tháp hơn định mức', size: 15.4 },
        { sector: 'Nhiệt độ vượt quá định mức', size: 11.1 },
        { sector: 'Nhiệt độ thấp hơn định mức', size: 28.4 }],
      2009: [
        { sector: 'Mất kết nối', size: 4.7 },
        { sector: 'Điện trở vượt định mức', size: 0.3 },
        { sector: 'Điện áp trôi vượt định mức', size: 16.4 },
        { sector: 'Điện áp trôi thấp hơn định mức', size: 1.9 },
        { sector: 'Điện áp hở mạch vượt định mức', size: 4.9 },
        { sector: 'Điện áp hở mạch tháp hơn định mức', size: 15.5 },
        { sector: 'Nhiệt độ vượt quá định mức', size: 10.9 },
        { sector: 'Nhiệt độ thấp hơn định mức', size: 27.9 }],
      2010: [
        { sector: 'Mất kết nối', size: 4.2 },
        { sector: 'Điện trở vượt định mức', size: 0.3 },
        { sector: 'Điện áp trôi vượt định mức', size: 16.2 },
        { sector: 'Điện áp trôi thấp hơn định mức', size: 2.2 },
        { sector: 'Điện áp hở mạch vượt định mức', size: 4.3 },
        { sector: 'Điện áp hở mạch tháp hơn định mức', size: 15.7 },
        { sector: 'Nhiệt độ vượt quá định mức', size: 10.2 },
        { sector: 'Nhiệt độ thấp hơn định mức', size: 28.8 }],
      2011: [
        { sector: 'Mất kết nối', size: 4.1 },
        { sector: 'Điện trở vượt định mức', size: 0.3 },
        { sector: 'Điện áp trôi vượt định mức', size: 14.9 },
        { sector: 'Điện áp trôi thấp hơn định mức', size: 2.3 },
        { sector: 'Điện áp hở mạch vượt định mức', size: 5 },
        { sector: 'Điện áp hở mạch tháp hơn định mức', size: 17.3 },
        { sector: 'Nhiệt độ vượt quá định mức', size: 10.2 },
        { sector: 'Nhiệt độ thấp hơn định mức', size: 27.2 }],
      2012: [
        { sector: 'Mất kết nối', size: 3.8 },
        { sector: 'Điện trở vượt định mức', size: 0.3 },
        { sector: 'Điện áp trôi vượt định mức', size: 14.9 },
        { sector: 'Điện áp trôi thấp hơn định mức', size: 2.6 },
        { sector: 'Điện áp hở mạch vượt định mức', size: 5.1 },
        { sector: 'Điện áp hở mạch tháp hơn định mức', size: 15.8 },
        { sector: 'Nhiệt độ vượt quá định mức', size: 10.7 },
        { sector: 'Nhiệt độ thấp hơn định mức', size: 28 }],
      2013: [
        { sector: 'Mất kết nối', size: 3.7 },
        { sector: 'Điện trở vượt định mức', size: 0.2 },
        { sector: 'Điện áp trôi vượt định mức', size: 14.9 },
        { sector: 'Điện áp trôi thấp hơn định mức', size: 2.7 },
        { sector: 'Điện áp hở mạch vượt định mức', size: 5.7 },
        { sector: 'Điện áp hở mạch tháp hơn định mức', size: 16.5 },
        { sector: 'Nhiệt độ vượt quá định mức', size: 10.5 },
        { sector: 'Nhiệt độ thấp hơn định mức', size: 26.6 }],
      2014: [
        { sector: 'Mất kết nối', size: 3.9 },
        { sector: 'Điện trở vượt định mức', size: 0.2 },
        { sector: 'Điện áp trôi vượt định mức', size: 14.5 },
        { sector: 'Điện áp trôi thấp hơn định mức', size: 2.7 },
        { sector: 'Điện áp hở mạch vượt định mức', size: 5.6 },
        { sector: 'Điện áp hở mạch tháp hơn định mức', size: 16.6 },
        { sector: 'Nhiệt độ vượt quá định mức', size: 10.5 },
        { sector: 'Nhiệt độ thấp hơn định mức', size: 26.5 }]
    }

    // Create chart instance
    const chart = am4core.create('chartdiv-timeline', am4charts.PieChart)

    // Add data
    chart.data = [
      { sector: 'Mất kết nối', size: 6.6 },
      { sector: 'Điện trở vượt định mức', size: 0.6 },
      { sector: 'Điện áp trôi vượt định mức', size: 23.2 },
      { sector: 'Điện áp trôi thấp hơn định mức', size: 2.2 },
      { sector: 'Điện áp hở mạch vượt định mức', size: 4.5 },
      { sector: 'Điện áp hở mạch tháp hơn định mức', size: 14.6 },
      { sector: 'Nhiệt độ vượt quá định mức', size: 9.3 },
      { sector: 'Nhiệt độ thấp hơn định mức', size: 22.5 }
    ]

    // Add label
    chart.innerRadius = 100
    const label = chart.seriesContainer.createChild(am4core.Label)
    label.text = '1995'
    label.horizontalCenter = 'middle'
    label.verticalCenter = 'middle'
    label.fontSize = 50

    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries())
    pieSeries.dataFields.value = 'size'
    pieSeries.dataFields.category = 'sector'

    // Animate chart data
    let currentYear = 1995
    function getCurrentData () {
      label.text = currentYear
      const data = chartData[currentYear]
      currentYear++
      if (currentYear > 2014) { currentYear = 1995 }
      return data
    }

    function loop () {
      // chart.allLabels[0].text = currentYear;
      const data = getCurrentData()
      for (var i = 0; i < data.length; i++) {
        chart.data[i].size = data[i].size
      }
      chart.invalidateRawData()
      chart.setTimeout(loop, 4000)
    }

    loop()
    return () => {
      chart.dispose()
    }
  }, [])
  return (
    <>
      <div id='chartdiv-timeline' style={{ width: '100%', height: '500px' }} />
    </>
  )
}
export default DefaultPage
