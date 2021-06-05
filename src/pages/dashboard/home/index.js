import React, { useState, useEffect } from 'react'
import RecentAlert from './Charts/recentAlert'
import BlockStatus from './Charts/blockStatus'
import InfoModal from './Charts/blockStatus/info'
// import PieAlert from './Charts/alertCount'
// import PieOnline from './Charts/pieOnline'
// import BarLine from './Charts/barline'

// import ManyPoint from './Charts/armchart/many-point'
// import AxisBreak from './Charts/armchart/axis-break'
// import Dumbell from './Charts/armchart/dumbell'
// import Intra from './Charts/armchart/intra'
// import Pareto from './Charts/armchart/pareto'
// import PieInPie from './Charts/armchart/pie-pie'
// import RangeArea from './Charts/armchart/range-area'
// import TimeLine from './Charts/armchart/timeline'
// import Zoomable from './Charts/armchart/zoomable'

import Donut from './dounut'
import Area from './area'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Select, Tabs } from 'antd'
import { Helmet } from 'react-helmet'
import './style.scss'

import DateRangePicker from 'react-bootstrap-daterangepicker'
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
  const { stats = {}, alertCount = {}, alertStats = [] } = system
  const usernameOrEmail = username || email
  if (typeof total === 'object') {
    total = total.count
  }

  return { list, loading, total, users, preConfirm, usernameOrEmail, role, stats, alertCount, alertStats, dispatch }
}

const DefaultPage = ({ total, stats, alertCount, dispatch }) => {
  const [tabKey, setTabKey] = useState('1')
  const [range, setRange] = useState({})
  const [blockState, setBlockState] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} thiết bị`
  })
  const changeTab = key => {
    setTabKey(key)
  }
  const [payload] = useState({
    filter: JSON.stringify({
      include: [{
        relation: 'devices',
        scope: {
          include: [{
            relation: 'systems',
            scope: {
              include: [{
                relation: 'blocks'
              }]
            }
          }]
        }
      }],
      skip: (pagination.current - 1) * pagination.pageSize,
      limit: pagination.pageSize,
      order: ['created DESC']
    })
  })

  useEffect(() => {
    if (total !== pagination.total) {
      setPagination({ ...pagination, total })
    }
  }, [total, pagination, setPagination])
  useEffect(() => {
    dispatch({
      type: 'authDevice/COUNT',
      payload: { where: (JSON.parse(payload.filter) || {}).where }
    })
    dispatch({
      type: 'authDevice/LIST',
      payload
    })
    dispatch({
      type: 'system/ALERT_COUNT',
      payload
    })
    dispatch({
      type: 'system/ALERT_STATS',
      payload
    })
    dispatch({
      type: 'system/SYSTEM_STATS',
      payload
    })
  }, [dispatch, payload])

  return (
    <>
      <div>
        <Helmet title='Hệ thống quản lý ắc quy' />
        <div className='row'>
          <div className='col-lg-12 col-md-12'>
            <h5 className='text-dark mb-4 text-uppercase'>Hệ thống quản lý và giám sát bình ắc quy</h5>
          </div>
        </div>

        {/* stats box */}
        <div clasName='stats-box'>
          <div className='row'>
            <div className='col-md-4 col-lg-4'>
              <div className='card'>
                <div className='card-body stats-block blue'>
                  <div className='stats-icon'>
                    <img src='/resources/images/deployed.svg' />
                  </div>
                  <div className='stats-body'>
                    <h1>200</h1>
                    <p>Đã triển khai</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-4 col-lg-4 green'>
              <div className='card'>
                <div className='card-body stats-block'>
                  <div className='stats-icon'>
                    <img src='/resources/images/connected.svg' />
                  </div>
                  <div className='stats-body'>
                    <h1>200</h1>
                    <p>Đang hoạt động</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-4 col-lg-4 red'>
              <div className='card'>
                <div className='card-body stats-block'>
                  <div className='stats-icon'>
                    <img src='/resources/images/disconnected.svg' />
                  </div>
                  <div className='stats-body'>
                    <h1>200</h1>
                    <p>Mất kết nối</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4 col-lg-4'>
              <div className='card'>
                <div className='card-body stats-block gold'>
                  <div className='stats-icon'>
                    <img src='/resources/images/warning.svg' />
                  </div>
                  <div className='stats-body'>
                    <h1>200</h1>
                    <p>Báo động</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-4 col-lg-4 red'>
              <div className='card'>
                <div className='card-body stats-block'>
                  <div className='stats-icon'>
                    <img src='/resources/images/alert.svg' />
                  </div>
                  <div className='stats-body'>
                    <h1>200</h1>
                    <p>Cảnh báo</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-4 col-lg-4 green'>
              <div className='card'>
                <div className='card-body stats-block'>
                  <div className='stats-icon'>
                    <img src='/resources/images/normal.svg' />
                  </div>
                  <div className='stats-body'>
                    <h1>200</h1>
                    <p>Bình thường</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Pie chart */}
        <div className='deploy-pie-chart row'>
          <div className='col-md-6 col-lg-6'>
            <div className='card'>
              <div className='card-header block-pie-system'>
                <div className='cui__utils__heading mb-0'>
                  <strong className='txt-blue'><i className='i_place_15 ico30' /> THỐNG KÊ TÌNH TRẠNG HỆ THỐNG
                  </strong
                  >
                </div>
              </div>
              <div className='card-body'>
                <Donut />
              </div>
            </div>
          </div>
          <div className='col-md-6 col-lg-6'>
            <div className='card'>
              <div className='card-header'>
                <div className='container-fluid form-header form-header-inline'>
                  <div className='row'>
                    <div className='form-header-left'>
                      <div className='display-flex'>
                        <div className='cui__utils__heading mb-0'>
                          <strong className='txt-blue'><i className='i_place_15 ico30' /> THỐNG KÊ TÌNH TRẠNG BLOCK
                          </strong
                          >
                        </div>
                        <Select
                          value={1}
                          options={[{ label: 'conto', value: 1 }]}
                          style={{ minWidth: 150, marginLeft: 20 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='card-body'>
                <Donut />
              </div>
            </div>
          </div>
        </div>
        {/* Area chart */}
        <div className='block-area-chart row'>
          <div className='col-md-8 col-lg-8'>
            <div className='card'>
              <div className='card-header block-pie-system'>
                <div className='form-header-left'>
                  <div className='display-flex'>
                    <div className='cui__utils__heading mb-0'>
                      <strong className='txt-blue'><i className='i_place_15 ico30' /> THỐNG KÊ TÌNH TRẠNG BLOCK
                      </strong
                      >
                    </div>
                    <Select
                      value={1}
                      options={[{ label: 'conto', value: 1 }]}
                      style={{ minWidth: 150, marginLeft: 20 }}
                    />
                  </div>
                </div>
              </div>
              <div className='card-body'>
                <Area />
              </div>
            </div>
          </div>
          <div className='col-md-4 col-lg-4'>
            <div className='card'>
              <div className='card-header'>
                <div className='container-fluid form-header form-header-inline'>
                  <div className='row'>
                    <div className='form-header-left'>
                      <div className='display-flex'>
                        <div className='cui__utils__heading mb-0'>
                          <strong className='txt-blue'><i className='i_place_15 ico30' /> CẢNH BÁO GẦN ĐÂY
                          </strong
                          >
                        </div>
                        <Select
                          value={1}
                          options={[{ label: 'conto', value: 1 }]}
                          style={{ minWidth: 135, marginLeft: 20 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Tabs activeKey={tabKey} className='mr-auto kit-tabs-bold' onChange={changeTab}>
                  <TabPane tab='Cảnh báo' key='1' />
                  <TabPane tab='Báo động' key='2' />
                </Tabs>
              </div>
              <div
                className='card-body dashboard-event' style={{
                  padding: 10,
                  maxHeight: '415px',
                  overflowY: 'auto'
                }}
              >
                {tabKey === '1' && (
                  <RecentAlert type='warning' />
                )}
                {tabKey === '2' && (
                  <RecentAlert type='alert' />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* block status */}
        <div className='block-status row'>
          <div className='col-md-6 col-lg-6'>
            <div className='card '>
              <div className='card-header block-pie-system'>
                <div className='form-header-left'>
                  <div className='display-flex'>
                    <div className='cui__utils__heading mb-0'>
                      <strong className='txt-blue'><i className='i_place_15 ico30' /> TRẠNG THÁI BATTERY VƯỢT NGƯỠNG
                      </strong
                      >
                    </div>
                    <Select
                      value={1}
                      options={[{ label: 'conto', value: 1 }]}
                      style={{ minWidth: 150, marginLeft: 20 }}
                    />
                  </div>
                </div>
              </div>
              <div className='card-body'>
                <BlockStatus setBlockState={setBlockState} />
              </div>
            </div>
          </div>
          <div className=' col-md-6 col-lg-6'>
            <div className='card '>
              <div className='card-header block-pie-system'>
                <div className='form-header-left'>
                  <div className='display-flex'>
                    <div className='cui__utils__heading mb-0'>
                      <strong className='txt-blue'><i className='i_place_15 ico30' /> TRẠNG THÁI BATTERY BÌNH THƯỜNG
                      </strong
                      >
                    </div>
                    <Select
                      value={1}
                      options={[{ label: 'conto', value: 1 }]}
                      style={{ minWidth: 150, marginLeft: 20 }}
                    />
                  </div>
                </div>
              </div>
              <div className='card-body'>
                <BlockStatus setBlockState={setBlockState} />
              </div>
            </div>
          </div>
        </div>
        {blockState && (
          <div className='row'>
            <div className=' col-md-12 col-lg-12'>
              <div className='card '>
                <div className='card-header block-pie-system'>
                  <div className='form-header-left'>
                    <div className='display-flex'>
                      <div className='cui__utils__heading mb-0'>
                        <strong className='txt-blue'><i className='i_place_15 ico30' />  THÔNG TIN BLOCK
                        </strong
                        >
                      </div>
                      <Select
                        value={1}
                        options={[{ label: 'conto', value: 1 }]}
                        style={{ minWidth: 150, marginLeft: 20 }}
                      />
                      <div
                        style={{ minWidth: 550 }}
                      >
                        <DateRangePicker
                          onApply={(event, picker) => {
                            setRange({
                              start: picker.startDate.unix(),
                              end: picker.endDate.unix()
                            })
                          }}
                        >
                          <input type='text' className='form-control col-4' />
                        </DateRangePicker>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className='card-body'
                >
                  <div>
                    <InfoModal modal={blockState} range={range} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
