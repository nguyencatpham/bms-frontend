import React, { useState, useEffect } from 'react'
import RecentAlert from './Charts/recentAlert'
import BlockStatus from './Charts/blockStatus'
import PieAlert from './Charts/alertCount'
import PieOnline from './Charts/pieOnline'
import BarLine from './Charts/barline'
import InfoModal from '../../device/detail/info'

import ManyPoint from './Charts/armchart/many-point'
import AxisBreak from './Charts/armchart/axis-break'
import Dumbell from './Charts/armchart/dumbell'
import Intra from './Charts/armchart/intra'
import Pareto from './Charts/armchart/pareto'
import PieInPie from './Charts/armchart/pie-pie'
import RangeArea from './Charts/armchart/range-area'
import TimeLine from './Charts/armchart/timeline'
import Zoomable from './Charts/armchart/zoomable'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import './style.scss'
// Themes begin

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
  const [modal, setModal] = useState()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} thiết bị`
  })
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
        {/* section 01 */}
        <div className='row'>
          <div className='col-md-4 col-lg-4 col-xs-12'>
            <div className='card'>
              <div className='card-body' style={{ minHeight: 450 }}>
                <PieOnline {...stats} />
              </div>
            </div>
          </div>
          <div className='col-md-8 col-lg-8 col-xs-12'>
            <Pareto />
          </div>
        </div>
        {/* section 02 */}
        <div className='row'>
          <div className='col-md-8 col-lg-8 col-xs-12'>
            <h5 className='text-dark mb-4'>Các cảnh báo gần đây</h5>
            <div className='card'>
              <div className='card-body'>
                <RecentAlert />
              </div>
            </div>
          </div>
          <div className='col-md-4 col-lg-4 col-xs-12' style={{ marginTop: 40 }}>
            <div className='card'>
              <div className='card-body' style={{ minHeight: 450 }}>
                <PieAlert {...alertCount} />
              </div>
            </div>
          </div>
        </div>

        <div className='col-xl-12 col-lg-12'>
          <BlockStatus />
        </div>
        {/* <div className='col-md-12'>
            <ManyPoint />
          </div>
          <div className='col-md-12'>
            <AxisBreak />
          </div>
          <div className='col-md-12'>          <div className='col-md-8'>
            <Pareto />
          </div>
            <Dumbell />
          </div>

          <div className='col-md-12'>
            <Pareto />
          </div>
          <div className='col-md-12'>
            <PieInPie />
          </div>
          <div className='col-md-12'>
            <RangeArea />
          </div>
          <div className='col-md-12'>
            <TimeLine />
          </div>
          <div className='col-md-12'>
            <Zoomable />
          </div> */}
        <div className='row' />
      </div>
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))