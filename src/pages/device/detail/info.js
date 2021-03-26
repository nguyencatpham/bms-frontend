import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { Button, Modal, Table } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'

import '../style.scss'
import { TIME_FORMAT } from 'constant'

am4core.useTheme(am4themesAnimated)

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

const mapStateToProps = ({ tsdata, dispatch }) => {
  return { tsdata, dispatch }
}

const DefaultPage = ({ modal, setModal, tsdata, dispatch }) => {
  const [info, setInfo] = useState([])
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
    chart.current.data = data
    chart.current.paddingRight = 20

    const dateAxis = chart.current.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.grid.template.location = 0

    const valueAxis = chart.current.yAxes.push(new am4charts.ValueAxis())
    valueAxis.tooltip.disabled = true
    valueAxis.renderer.minWidth = 35

    const series = chart.current.series.push(new am4charts.LineSeries())
    series.dataFields.dateX = 'timestamp'
    series.dataFields.valueY = 'v0'

    series.tooltipText = '{valueY.value}'
    chart.current.cursor = new am4charts.XYCursor()

    const scrollbarX = new am4charts.XYChartScrollbar()
    scrollbarX.series.push(series)
    chart.current.scrollbarX = scrollbarX

    return () => {
      armChart.dispose()
    }
  }, [])

  // Create series
  function createAxisAndSeries (field, name, opposite) {
    const valueAxis = chart.current.yAxes.push(new am4charts.ValueAxis())
    if (chart.current.yAxes.indexOf(valueAxis) !== 0) {
      valueAxis.syncWithAxis = chart.current.yAxes.getIndex(0)
    }

    const series = chart.current.series.push(new am4charts.LineSeries())
    series.dataFields.valueY = field
    series.dataFields.dateX = 'timestamp'
    series.strokeWidth = 2
    series.yAxis = valueAxis
    series.name = name
    series.tooltipText = '{name}: [bold]{valueY}[/]'
    series.tensionX = 0.8
    series.showOnInit = true

    const interfaceColors = new am4core.InterfaceColorSet()

    valueAxis.renderer.line.strokeOpacity = 1
    valueAxis.renderer.line.strokeWidth = 2
    valueAxis.renderer.line.stroke = series.stroke
    valueAxis.renderer.labels.template.fill = series.stroke
    valueAxis.renderer.opposite = opposite
  }

  // useEffect(() => {
  //   // chart.current.data = tsdata
  //   createAxisAndSeries('v0', 'v0', false)
  //   createAxisAndSeries('r1', 'R1', true)
  //   createAxisAndSeries('r2', 'R2', true)
  //   createAxisAndSeries('vscale', 'vscale', true)
  //   createAxisAndSeries('r', 'R', true)
  // }, [tsdata])
  useEffect(() => {
    dispatch({
      type: 'system/GET_TSDATA',
      payload: { id: modal.systemId, start: Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60, end: Math.floor(Date.now() / 1000), macAddress: modal.macAddress, type: 'v0' }
    })
  }, [modal.id, dispatch])

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
    <>
      <Modal
        key='batery-details'
        className='modal-cus modal-monitoring'
        visible={!!modal}
        onCancel={() => setModal(false)}
        width={1200}
        title={<span>Thông tin Block: <span className='cabinet-heading cabinet-name'><span className='cabinet-status-online' />10</span></span>}
        footer={[
          <>
            <Button className='btn btn-export' onClick={() => setModal(false)}>Đóng</Button>
          </>
        ]}
      >
        <div className='row'>
          <div className='col-md-8 col-xs-12'>
            <div>
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
                    dataSource={info}
                    columns={columns}
                    pagination={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
