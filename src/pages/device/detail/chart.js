import React, { useEffect, useState } from 'react'
import { Select, Table, DatePicker } from 'antd'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Line } from 'react-chartjs-2'
import moment from 'moment'
import faker from 'faker'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

import '../style.scss'

am4core.useTheme(am4themes_animated)
const { Option } = Select
const { RangePicker } = DatePicker

const mapStateToProps = ({ system, dispatch }) => {
  const list = []
  const loading = false
  const total = 0
  const users = []
  const userZone = {}
  const zones = []

  for (let i = 0; i < 100; i++) {
    list.push({
      no: i + 1,
      siteName: faker.name.firstName(),
      remoteIp: faker.internet.ip(),
      ethernetIp: faker.internet.ip(),
      wifiIp: faker.internet.ip(),
      configFile: `${faker.random.word()}.json`,
      version: `${faker.random.number(10)}.${faker.random.number(10)}.${faker.random.number(10)}`,
      lastSeen: faker.date.past().toISOString(),
      note: faker.random.words()
    })
  }

  return { list, loading, total, users, system, dispatch }
}
const DefaultPage = ({ system, dispatch }) => {
  const [chart, setChart] = useState({})
  const alerts = []
  for (let i = 0; i < 10; i++) {
    const data = {
      label: faker.random.number({ min: 1607731200, max: 1607763414 }),
      value: faker.random.number(10)
    }
    alerts.push(data)
  }
  const supportCasesTableData = [
    {
      key: '1',
      type: 'V0',
      amount: faker.random.number()
    },
    {
      key: '2',
      type: 'E',
      amount: faker.random.number()
    },
    {
      key: '3',
      type: 'SoC',
      amount: faker.random.number()
    },
    {
      key: '4',
      type: 'R',
      amount: faker.random.number()
    },
    {
      key: '5',
      type: 'T',
      amount: faker.random.number()
    },
    {
      key: '6',
      type: 'Thời hạn bảo hành',
      amount: ` Còn lại ${faker.random.number(24)} tháng`
    },
    {
      key: '7',
      type: 'Ngày sản xuất ',
      amount: faker.date.recent().toLocaleDateString()
    }

  ]
  const supportCasesTableColumns = [
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Thông số',
      key: 'amount',
      dataIndex: 'amount',
      render: amount => {
        if (amount === 'Negative') {
          return <span className='text-danger font-weight-bold'>{amount}</span>
        }
        return <span className='text-primary font-weight-bold'>{amount}</span>
      }
    }
  ]
  const data = {
    labels: alerts.map(x => moment.unix(x.label).format('HH:mm')),
    datasets: [
      {
        label: 'V0',
        data: alerts.map(x => faker.random.number({ min: 0, max: x.value })),
        backgroundColor: '#f5222d',
        borderColor: '#f5222d',
        type: 'line',
        fill: false,
        lineThickness: 1,
        lineTension: 0,
        spanGaps: true,
        pointBorderWidth: 0,
        pointStyle: 'line',
        // borderJoinStyle:'round',
        boderWidth: 0.5
        // yAxisID: 'y-axis-1'
      }, {
        label: 'E',
        data: alerts.map(x => faker.random.number({ min: 0, max: x.value - 1 })),
        backgroundColor: '#fadb14',
        borderColor: '#fadb14',
        type: 'line',
        fill: false,
        lineThickness: 1,
        lineTension: 0,
        spanGaps: true,
        pointBorderWidth: 0,
        pointStyle: 'line',
        // borderJoinStyle:'round',
        boderWidth: 0.5
        // yAxisID: 'y-axis-1'
      }, {
        label: 'SoC',
        data: alerts.map(x => faker.random.number({ min: 0, max: x.value - 2 })),
        backgroundColor: '#096dd9',
        borderColor: '#096dd9',
        type: 'line',
        fill: false,
        lineThickness: 1,
        lineTension: 0,
        spanGaps: true,
        pointBorderWidth: 0,
        pointStyle: 'line',
        // borderJoinStyle:'round',
        boderWidth: 0.5
        // yAxisID: 'y-axis-1'
      }, {
        label: 'R',
        data: alerts.map(x => faker.random.number({ min: 0, max: x.value - 3 })),
        backgroundColor: '#389e0d',
        borderColor: '#389e0d',
        type: 'line',
        fill: false,
        lineThickness: 1,
        lineTension: 0,
        spanGaps: true,
        pointBorderWidth: 0,
        pointStyle: 'line',
        // borderJoinStyle:'round',
        boderWidth: 0.5
        // yAxisID: 'y-axis-1'
      }, {
        label: 'T',
        data: alerts.map(x => faker.random.number({ min: 0, max: x.value - 4 })),
        backgroundColor: '#eb2f96',
        borderColor: '#eb2f96',
        type: 'line',
        fill: false,
        lineThickness: 1,
        lineTension: 0,
        spanGaps: true,
        pointBorderWidth: 0,
        pointStyle: 'line',
        // borderJoinStyle:'round',
        boderWidth: 0.5
        // yAxisID: 'y-axis-1'
      }
    ]
  }

  const options = {
    // legend: {
    //   display: false
    // },
    elements: {
      point: {
        radius: 0
      }
    },
    scales: {
      yAxes: [{
        id: 'y-axis-1',
        display: true,
        ticks: {
          suggestedMin: 0, // minimum will be 0, unless there is a lower value.
          // OR //
          beginAtZero: true, // minimum value will be 0.
          stepsize: 1,
          suggestedMax: 10,
          // max: 25000
          callback: function (value) {
            if (Math.floor(value) === value) {
              return value
            }
          }

        }
      }]
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel
        }
      }
    }
  }
  useEffect(() => {
    const chart = am4core.create('chartdiv', am4charts.XYChart)

    chart.paddingRight = 20

    const data = []
    let visits = 10
    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10)
      data.push({ date: new Date(2018, 0, i), name: 'name' + i, value: visits })
    }

    chart.data = data

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.grid.template.location = 0

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.tooltip.disabled = true
    valueAxis.renderer.minWidth = 35

    const series = chart.series.push(new am4charts.LineSeries())
    series.dataFields.dateX = 'date'
    series.dataFields.valueY = 'value'

    series.tooltipText = '{valueY.value}'
    chart.cursor = new am4charts.XYCursor()

    const scrollbarX = new am4charts.XYChartScrollbar()
    scrollbarX.series.push(series)
    chart.scrollbarX = scrollbarX

    setChart(chart)
  }, [system])

  useEffect(() => {
    return () => {
      if (chart && typeof chart.dispose === 'function') {
        console.log('cleaned up')
        chart.dispose()
      }
    }
  }, [system])
  return (
    <>
      <div className='chart'>
        <Helmet title='Quản lý sự kiện' />
        <div className='row'>
          <div className='col-lg-12 col-md-12'>
            <h5 className='text-dark mb-4 text-uppercase'>Thông tin thiết bị</h5>
            <div className='card'>
              <div className='card-body row'>
                <div className='col-md-4'>
                  <RangePicker />
                </div>
                <div className='col-md-3'>
                  <Select
                    mode='multiple'
                    allowClear
                    style={{ width: '100%' }}
                    placeholder='System'
                  >
                    <Option>SESAN4_220KV_BMS1</Option>
                  </Select>
                </div>
                <div className='col-md-3'>
                  <Select
                    mode='multiple'
                    allowClear
                    style={{ width: '100%' }}
                    placeholder='Unit'
                  >
                    <Option>Local Unit</Option>
                  </Select>
                </div>
                <div className='col-md-2'>
                  <div className='text-right fl-right'>
                    <Link className='btn btn-primary' to={null}><i className='i_user ico25' />Lấy dữ liệu</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <div className='row'>
              <div className='col-md-8 col-xs-12'>
                <div>
                  <div id='chartdiv' style={{ width: '100%', height: '500px' }} />
                  {/* <Line data={data} options={options} height={400} width={800} /> */}
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
                        dataSource={supportCasesTableData}
                        columns={supportCasesTableColumns}
                        pagination={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
