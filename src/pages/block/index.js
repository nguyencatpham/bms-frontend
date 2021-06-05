import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { Table } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import jQuery from 'jquery'
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css'
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css'

import { TIME_FORMAT } from 'constant'
// expose jQuery to window for debugging
window.jQuery = window.$ = jQuery

am4core.useTheme(am4themesAnimated)

const mapStateToProps = ({ system, dispatch }) => {
  const { tsdata = [] } = system
  return { tsdata, dispatch }
}

const DefaultPage = ({ block, tsdata, dispatch }) => {
  const [info, setInfo] = useState([])
  const [range, setRange] = useState({})
  const chart = useRef(null)

  useLayoutEffect(() => {
    const armChart = am4core.create('chartdiv', am4charts.XYChart)

    chart.current = armChart
    // chart.current.data = data
    console.log('test', tsdata)
    chart.current.data = tsdata.map(({ timestamp, v0, e, soc, r, t }) => ({ timestamp: new Date(timestamp), v0, e, soc, r, t }))
    chart.current.paddingRight = 20
    // Create axes
    const dateAxis = chart.current.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.minGridDistance = 50
    dateAxis.renderer.grid.template.location = 0
    dateAxis.minZoomCount = 5
    // this makes the data to be grouped
    dateAxis.groupData = true

    const valueAxis = chart.current.yAxes.push(new am4charts.ValueAxis())
    if (chart.current.yAxes.indexOf(valueAxis) !== 0) {
      valueAxis.syncWithAxis = chart.current.yAxes.getIndex(0)
    }

    createAxisAndSeries(valueAxis, 'v0', 'VO', false, 'circle')
    createAxisAndSeries(valueAxis, 'e', 'E', false, 'triangle')
    createAxisAndSeries(valueAxis, 'r', 'R', false, 'rectangle')
    createAxisAndSeries(valueAxis, 't', 'T', false, 'rectangle')

    const valueAxis2 = chart.current.yAxes.push(new am4charts.ValueAxis())
    createAxisAndSeries(valueAxis2, 'soc', 'SoC', true, 'rectangle')
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
    chart.current.data = tsdata.map(({ timestamp, v0, e, soc, r, t }) => ({ timestamp: new Date(timestamp), v0, e, soc, r, t }))
  }, [tsdata])

  // Create series
  const createAxisAndSeries = (valueAxis, field, name, opposite) => {
    const series = chart.current.series.push(new am4charts.LineSeries())
    series.dataFields.dateX = 'timestamp'
    series.dataFields.valueY = field
    series.tooltipText = '{name}: [bold]{valueY}[/]'
    series.tooltip.pointerOrientation = 'vertical'
    series.tooltip.background.fillOpacity = 0.5
    series.name = name
    series.yAxis = valueAxis
    series.showOnInit = true

    valueAxis.renderer.line.strokeOpacity = 1
    valueAxis.renderer.line.stroke = series.stroke
    valueAxis.renderer.labels.template.fill = series.stroke
    valueAxis.renderer.opposite = opposite
  }

  const columns = [
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Thông số',
      key: 'amount',
      dataIndex: 'amount',
      render: (amount, item) => {
        if (amount === 'Negative') {
          return <span className='text-capital text-danger font-weight-bold'>{amount}</span>
        }
        if (item.type === 'created' || item.type === 'updated') {
          return <span className='text-capital text-primary font-weight-bold'>{amount ? moment(amount).format(TIME_FORMAT) : '---'}</span>
        }
        return <span className='text-capital text-primary font-weight-bold'>{amount}</span>
      }
    }
  ]

  const onFilter = (event, picker) => {
    console.log(event)
    setRange({
      start: picker.startDate.unix(),
      end: picker.endDate.unix()
    })
  }

  useEffect(() => {
    dispatch({
      type: 'system/GET_TSDATA',
      payload: {
        id: modal.systemId,
        start: range.start || 1,
        end: range.end || Math.floor(Date.now() / 1000),
        macAddress: modal.macAddress,
        type: 'v0'
      }
    })
  }, [range, modal.macAddress, modal.systemId, dispatch])
  useEffect(() => {
    const info = { ...modal }
    delete info.id
    delete info.deviceId
    delete info.systemId
    delete info.unitId
    delete info.stringId
    delete info.macAddress
    const blockInfo = Object.keys(info).map(key =>
      ({
        key,
        type: key,
        amount: modal[key]
      }))
    setInfo(blockInfo)
  }, [modal.id])

  return (
    <div className='container block-info'>
      <h3>Thông tin Block: <span className='cabinet-heading cabinet-name' /><span className='cabinet-status-online' /></h3>
      <div className='row'>
        <div className='col-md-8 col-xs-12'>
          <div>
            <div
              style={{ marginLeft: 50 }}
            >
              <DateRangePicker
                onApply={onFilter}
              >
                <input type='text' className='form-control col-4' />
              </DateRangePicker>
            </div>
            <div id='chartdiv' style={{ width: '100%', height: '500px' }} />
          </div>
        </div>
        <div className='col-md-4 col-xs-12'>
          <div className='card'>
            <div className='card-header border-0 pb-0'>
              <div className='cui__utils__heading mb-0'>
                <strong className='text-uppercase font-size-16'>Thông tin chi tiết</strong>
              </div>
            </div>
            <div className='card-body'>
              <div className='mb-3'>
                <Table
                  rowKey={x => x.type + x.amount}
                  dataSource={info}
                  columns={columns}
                  pagination={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
