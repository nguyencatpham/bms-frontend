import React, { useState, useEffect } from 'react'
import List12 from 'components/kit/widgets/Lists/12'
import RecentAlert from 'components/kit/widgets/Lists/recentAlert'
import Chart2 from './Charts/2'
import BlockStatus from './Charts/blockStatus'
import PieAlert from './Charts/alertCount'
import PieOnline from './Charts/pieOnline'
import BarLine from './Charts/barline'
import { Pagination } from 'antd'
import InfoModal from '../../device/detail/info'

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

const DefaultPage = ({ total, role, stats, alertCount, alertStats, dispatch }) => {
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
          <div className='col-xl-8 col-lg-12'>
            <div className='row'>
              <div className='col-lg-6'>
                <div className='card'>
                  <div className='card-body'>
                    <PieOnline {...stats} />
                  </div>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='card'>
                  <div className='card-body'>
                    <PieAlert {...alertCount} />
                  </div>
                </div>
              </div>
            </div>
            <h5 className='text-dark mb-4'>Phân tích và Thống kê</h5>
            <div className='card' style={{ paddingTop: 10, paddingLeft: 10 }}>
              <BarLine />
            </div>
            <div className='row'>
              <div className='col-lg-12'>
                <h5 className='text-dark mb-4'>Các cảnh báo gần đây</h5>
                <div className='card'>
                  <div className='card-body'>
                    <RecentAlert />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-12'>
            <BlockStatus />
          </div>
        </div>
        {modal &&
          <InfoModal modal={modal} setModal={setModal} />}
      </div>
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
