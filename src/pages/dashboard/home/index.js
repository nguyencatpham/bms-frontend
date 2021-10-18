import React, { useState, useEffect, useRef } from 'react'
// import RecentAlert from './Charts/recentAlert'
// import BlockStatus from './Charts/blockStatus'
// import BlockAlertStatus from './Charts/blockAlertStatus'
// import ChartViewer from './Charts/blockStatus/info'
import TitleIcon from './titleIcon'

// import Donut from './dounut'
import VerticalBar from './verticalbar'
// import RadiaBar from './radialbar'
import Donut from './donut'
import LineChart from './lineChart'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Select, Tabs, Form, Input, Button, DatePicker, Pagination } from 'antd'
import PlusCircleOutlinedIcon from '@ant-design/icons/PlusCircleOutlined'
import { Helmet } from 'react-helmet'
import './style.scss'
import CollectData from './collectData'

import jQuery from 'jquery'
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css'
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css'
// expose jQuery to window for debugging
window.jQuery = window.$ = jQuery

// Themes begin
const { TabPane } = Tabs

const mapStateToProps = ({ authDevice, user, system, dispatch }) => {
  let { list, loading, total, preConfirm } = authDevice
  const { list: users, username, email, role } = user
  const { stats = {}, alertCount = {}, alertCountBySystem = {}, list: systems = [] } = system
  const usernameOrEmail = username || email
  if (typeof total === 'object') {
    total = total.count
  }

  return {
    list,
    loading,
    total,
    users,
    preConfirm,
    usernameOrEmail,
    role,
    stats,
    alertCount,
    alertCountBySystem,
    systems,
    dispatch,
  }
}

const DefaultPage = ({ total, stats, systems, alertCount, alertCountBySystem, dispatch }) => {
  const { healthy = 0, unhealthy = 0, deployed = 0 } = stats
  const { normal = 0, warning = 0, alert = 0 } = alertCount
  const {
    normal: normalBySystem = 0,
    warning: warningBySystem = 0,
    alert: alertBySystem = 0,
  } = alertCountBySystem
  const [tabKey, setTabKey] = useState('1')
  const rangeEnd = Math.floor(Date.now() / 1000)
  const rangeStart = rangeEnd - 7 * 24 * 60 * 60
  const [range, setRange] = useState({ start: rangeStart, end: rangeEnd })
  const [systemId, setSystemId] = useState()
  const [blockState, setBlockState] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} thiết bị`,
  })
  const changeTab = (key) => {
    setTabKey(key)
  }
  const [payload] = useState({
    filter: JSON.stringify({
      include: [
        {
          relation: 'devices',
          scope: {
            include: [
              {
                relation: 'systems',
                scope: {
                  include: [
                    {
                      relation: 'blocks',
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
      skip: (pagination.current - 1) * pagination.pageSize,
      limit: pagination.pageSize,
      order: ['created DESC'],
    }),
  })

  useEffect(() => {
    if (total !== pagination.total) {
      setPagination({ ...pagination, total })
    }
  }, [total, pagination, setPagination])
  useEffect(() => {
    dispatch({
      type: 'authDevice/COUNT',
      payload: { where: (JSON.parse(payload.filter) || {}).where },
    })
    dispatch({
      type: 'authDevice/LIST',
      payload,
    })
    dispatch({
      type: 'system/ALERT_COUNT',
      payload,
    })
    dispatch({
      type: 'system/ALERT_COUNT_BY_SYSTEM',
      payload: {
        systemId,
      },
    })
    dispatch({
      type: 'system/LIST',
      payload: {
        filter: { fields: { systemId: true, name: true } },
      },
    })
    dispatch({
      type: 'system/SYSTEM_STATS',
      payload,
    })
  }, [dispatch, payload])
  useEffect(() => {
    if (systems.length && !systemId) {
      setSystemId(systems[0].systemId)
    }
  }, [systemId, systems])
  useEffect(() => {
    dispatch({
      type: 'system/ALERT_COUNT_BY_SYSTEM',
      payload: {
        systemId,
      },
    })
  }, [systemId])

  const verticalBarSeries = [
    {
      name: 'RUpper',
      data: 5,
      color: '#865439',
    },
    {
      name: 'VUpper',
      data: 4,
      color: '#FF7600',
    },
    {
      name: 'ELower',
      data: 10,
      color: '#FFF338',
    },
    {
      name: 'TUpper',
      data: 20,
      color: '#FF4848',
    },
  ]

  const lineChartSeries = [
    {
      name: 'RUpper',
      data: [40, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15],
      color: '#865439',
    },
    {
      name: 'VUpper',
      data: [35, 41, 52, 42, 13, 18, 29, 37, 36, 51, 32],
      color: '#FF7600',
    },
    {
      name: 'ELower',
      data: [45, 57, 74, 70, 75, 38, 62, 47, 40, 56, 45],
      color: '#FFF338',
    },
    {
      name: 'TUpper',
      data: [36, 45, 68, 61, 69, 49, 67, 48, 44, 52, 41],
      color: '#FF4848',
    },
  ]

  const normalBlock = {
    name: 'Bình thường',
    data: 20,
    color: '#017EFA',
  }

  return (
    <>
      <Helmet title="Hệ thống quản lý ắc quy" />

      {/* stats % chart */}
      <div className="dashboard-page page">
        <div className="left-side">
          <div>
            <div>
              <Form
                className="select-bar"
                // onFinish={onFinish}
              >
                <div className="form-item" name="gender" rules={[{ required: true }]}>
                  <select
                    style={{ position: 'relative' }}
                    className="select"
                    placeholder="Select a option and change input text above"
                    // onChange={onGenderChange}
                    // allowClear
                  >
                    <option value="1">System 1</option>
                    <option value="2">System 2</option>
                    <option value="3">System 3</option>
                  </select>
                  <PlusCircleOutlinedIcon />
                </div>
                <div className="form-item" name="gender" rules={[{ required: true }]}>
                  <select
                    className="select"
                    placeholder="Select a option and change input text above"
                    // onChange={onGenderChange}
                    // allowClear
                  >
                    <option value="1">Unit 1</option>
                    <option value="2">Unit 2</option>
                    <option value="3">Unit 3</option>
                  </select>
                  <PlusCircleOutlinedIcon />
                </div>
                <div className="form-item" name="gender" rules={[{ required: true }]}>
                  <select
                    className="select"
                    placeholder="Select a option and change input text above"
                    // onChange={onGenderChange}
                    // allowClear
                  >
                    <option value="1">Block 1</option>
                    <option value="2">Block 2</option>
                    <option value="3">Block 3</option>
                  </select>
                  <PlusCircleOutlinedIcon />
                </div>
              </Form>
            </div>
            <div className="first-two-charts">
              <div className="custom-card custom-card--warning">
                <div className="custom-card__header">
                  <TitleIcon />
                  <h2 className="custom-card__title">Cảnh báo</h2>
                </div>
                <div className="custom-card__body">
                  <VerticalBar
                    series={verticalBarSeries}
                    // labels={['Bình thường', 'Cảnh báo', 'Báo động']}
                  />
                </div>
              </div>
              <div className="custom-card custom-card--status">
                <div className="custom-card__header">
                  <TitleIcon />
                  <h2 className="custom-card__title">Tình trạng</h2>
                </div>
                <div className="custom-card__body">
                  <Donut

                  // series={[healthy, unhealthy]}
                  // labels={['Đang hoạt động', 'Mất kết nối']}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="custom-card custom-card--operate">
              <div className="custom-card__header justify-content-between">
                <div className="d-flex align-items-center">
                  <TitleIcon />
                  <h2 className="custom-card__title">Vận hành</h2>
                </div>
                <DatePicker
                  placeholder="Chọn thời gian"
                  format="DD/MM/YYYY"
                  // onChange={onChange}
                />
              </div>
              <div className="custom-card__body">
                <LineChart series={lineChartSeries} />
              </div>
            </div>
          </div>
        </div>
        <div className="right-side">
          <CollectData dataArr={[...verticalBarSeries, normalBlock]}/>
        </div>
      </div>
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
