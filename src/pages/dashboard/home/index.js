import React, { useState, useEffect } from 'react'
import TitleIcon from './titleIcon'
import VerticalBar from './verticalbar'
import Donut from './donut'
import LineChart from './lineChart'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, DatePicker } from 'antd'
import PlusCircleOutlinedIcon from '@ant-design/icons/PlusCircleOutlined'
import { Helmet } from 'react-helmet'
import './style.scss'
import BlockList from './blocks'

import jQuery from 'jquery'
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css'
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css'
import { get } from 'lodash'
import moment from 'moment'
import { calTimeBucket } from 'utils'
// expose jQuery to window for debugging
window.jQuery = window.$ = jQuery

const mapStateToProps = ({ authDevice, device, user, system, dispatch }) => {
  let { list, loading, total, preConfirm } = authDevice
  const { list: devices, units = [], blocks = [], blockStats = {}, blockEvents = {}, blocksSummary = [] } = device
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
    devices,
    units,
    blocks,
    blockStats,
    blockEvents,
    blocksSummary,
    dispatch
  }
}

const DefaultPage = ({ total, systems, devices, units, blocks, blockStats, blockEvents, blocksSummary, dispatch }) => {
  const [time, setTime] = useState(moment())
  const [systemId, setSystemId] = useState()
  const [unitId, setUnitId] = useState()
  const [blockId, setBlockId] = useState()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} thiết bị`
  })
  const blockStatistic = [
    {
      name: 'RUpper',
      data: get(blockStats, ['alert', 'rUpper'], 0),
      color: '#865439'
    },
    {
      name: 'VUpper',
      data: get(blockStats, ['alert', 'vUpper'], 0),
      color: '#FF7600'
    },
    {
      name: 'ELower',
      data: get(blockStats, ['alert', 'eLower'], 0),
      color: '#FFF338'
    },
    {
      name: 'TUpper',
      data: get(blockStats, ['alert', 'tUpper'], 0),
      color: '#FF4848'
    }
  ]
  const blockStatus = [get(blockStats, ['status', 'healthy'], 0), get(blockStats, ['status', 'unhealthy'], 0), get(blockStats, ['status', 'alert'], 0)]

  const blockAlertSeries = [
    {
      name: 'RUpper',
      data: blockEvents.rUpper || [],
      color: '#865439'
    },
    {
      name: 'VUpper',
      data: blockEvents.vUpper || [],
      color: '#FF7600'
    },
    {
      name: 'ELower',
      data: blockEvents.eLower || [],
      color: '#FFF338'
    },
    {
      name: 'TUpper',
      data: blockEvents.tUpper || [],
      color: '#FF4848'
    // },
    // {
    //   name: 'Offline',
    //   data: blockEvents.offline || [],
    //   color: '#FF4848'
    }
  ]

  useEffect(() => {
    if (total !== pagination.total) {
      setPagination({ ...pagination, total })
    }
  }, [total, pagination, setPagination])
  useEffect(() => {
    if (devices.length && !systemId) {
      setSystemId(devices[0].id)
    }
  }, [systemId, devices])
  useEffect(() => {
    dispatch({
      type: 'device/LIST',
      payload: {
        filter: JSON.stringify({ fields: ['id', 'name'], order: ['created DESC'] })
      }
    })
  }, [])
  useEffect(() => {
    if (systemId) {
      dispatch({
        type: 'device/UNITS',
        payload: {
          id: systemId,
          filter: JSON.stringify({
            fields: ['id', 'name', 'localUnitId'],
            order: ['created DESC']
          })
        }
      })
    }
  }, [systemId])
  useEffect(() => {
    if (systemId) {
      dispatch({
        type: 'device/BLOCK_EVENTS',
        payload: {
          id: systemId,
          start: (time || moment()).startOf('day').unix(),
          end: (time || moment()).endOf('day').unix(),
          priority: [0, 1, 2, 3, 4, 5],
          unitId,
          macAddress: get(blocks.find(x => x.id === blockId), ['macAddress']),
          timebucket: calTimeBucket({ start: (time || moment()).startOf('day'), end: (time || moment()).endOf('day') }),
          isAsc: true,
          limit: 1000
          //  stringId
        }
      })
    }
  }, [systemId, time])
  useEffect(() => {
    if (systemId) {
      dispatch({
        type: 'device/BLOCK_STATS',
        payload: {
          id: systemId,
          unitId,
          blockId
        }
      })
      dispatch({
        type: 'device/BLOCKS',
        payload: {
          id: systemId,
          unitId,
          blockId,
          filter: JSON.stringify({
            order: ['localBlockId ASC', 'id ASC']
          })
        }
      })
      dispatch({
        type: 'device/BLOCKS_SUMMARY',
        payload: {
          id: systemId,
          unitId,
          filter: JSON.stringify({
            order: ['localBlockId ASC', 'id ASC']
          })
        }
      })
    }
  }, [systemId, unitId, blockId])
  // polling
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (systemId) {
  //       dispatch({
  //         type: 'device/BLOCK_STATS',
  //         payload: {
  //           id: systemId,
  //           unitId,
  //           blockId
  //         }
  //       })
  //     }
  //   }, 60 * 1000)
  //   return () => clearInterval(interval)
  // }, [systemId, unitId, blockId])
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (systemId) {
  //       dispatch({
  //         type: 'device/BLOCKS',
  //         payload: {
  //           id: systemId,
  //           unitId,
  //           filter: JSON.stringify({
  //             // fields: ['id', 'localBlockId', 'macAddress'],
  //             order: ['localBlockId ASC', 'id ASC']
  //           })
  //         }
  //       })
  //     }
  //   }, 60 * 1000)
  //   return () => clearInterval(interval)
  // }, [systemId, unitId])
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (systemId) {
  //       dispatch({
  //         type: 'device/BLOCK_EVENTS',
  //         payload: {
  //           id: systemId,
  //           start: time.startOf('day').unix(),
  //           end: time.endOf('day').unix(),
  //           priority: [0, 1, 2, 3, 4, 5],
  //           unitId,
  //           macAddress: get(blocks.find(x => x.id === blockId), ['macAddress']),
  //           timebucket: calTimeBucket({ start: time.startOf('day'), end: time.endOf('day') }),
  //           isAsc: true,
  //           limit: 1000
  //         //  stringId
  //         }
  //       })
  //     }
  //   }, 60 * 1000)
  //   return () => clearInterval(interval)
  // }, [systemId, time])
  return (
    <>
      <Helmet title='Hệ thống quản lý ắc quy' />

      {/* stats % chart */}
      <div className='dashboard-page page'>
        <div className='left-side'>
          <div>
            <div>
              <Form
                className='select-bar'
                // onFinish={onFinish}
              >
                <div className='form-item' name='systemId' rules={[{ required: true }]}>
                  <select
                    style={{ position: 'relative' }}
                    className='select'
                    placeholder='Chọn hệ thống'
                    onChange={(e) => {
                      setSystemId(e.target.value)
                      setPagination({
                        ...pagination,
                        current: 1
                      })
                    }}
                    value={systemId}
                  >
                    {devices.map(x => (
                      <option key={x.id} value={x.id}>{x.name}</option>
                    ))}
                  </select>
                  <PlusCircleOutlinedIcon />
                </div>
                <div className='form-item' name='unitId' rules={[{ required: true }]}>
                  <select
                    className='select'
                    placeholder='Chọn Unit'
                    onChange={(e) => {
                      setUnitId(e.target.value)
                      setBlockId()
                      setPagination({
                        ...pagination,
                        current: 1
                      })
                    }}
                    value={unitId}
                  >
                    <option value=''>Tất cả</option>
                    {units.map(x => (
                      <option key={x.id} value={x.localUnitId}>{x.name}</option>
                    ))}
                  </select>
                  <PlusCircleOutlinedIcon />
                </div>
                <div className='form-item' name='blockId' rules={[{ required: true }]}>
                  <select
                    className='select'
                    placeholder='Chọn Block'
                    onChange={(e) => {
                      setBlockId(e.target.value)
                      setPagination({
                        ...pagination,
                        current: 1
                      })
                    }}
                    value={blockId}
                  >
                    <option value=''>Tất cả</option>
                    {blocksSummary.map(x => (
                      <option key={x.id} value={x.id}>Block {x.localBlockId || x.id}</option>
                    ))}
                  </select>
                  <PlusCircleOutlinedIcon />
                </div>
              </Form>
            </div>
            <div className='first-two-charts'>
              <div className='custom-card custom-card--warning'>
                <div className='custom-card__header'>
                  <TitleIcon />
                  <h2 className='custom-card__title'>Cảnh báo</h2>
                </div>
                <div className='custom-card__body'>
                  <VerticalBar
                    series={blockStatistic}
                    // labels={['Bình thường', 'Cảnh báo', 'Báo động']}
                  />
                </div>
              </div>
              <div className='custom-card custom-card--status'>
                <div className='custom-card__header'>
                  <TitleIcon />
                  <h2 className='custom-card__title'>Tình trạng</h2>
                </div>
                <div className='custom-card__body'>
                  <Donut series={blockStatus} />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className='custom-card custom-card--operate'>
              <div className='custom-card__header justify-content-between'>
                <div className='d-flex align-items-center'>
                  <TitleIcon />
                  <h2 className='custom-card__title'>Vận hành</h2>
                </div>
                <DatePicker
                  placeholder='Chọn thời gian'
                  format='DD/MM/YYYY'
                  value={time}
                  onChange={setTime}
                />
              </div>
              <div className='custom-card__body'>
                <LineChart series={blockAlertSeries} />
              </div>
            </div>
          </div>
        </div>
        <div className='right-side'>
          <BlockList data={blocks} />
        </div>
      </div>
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
