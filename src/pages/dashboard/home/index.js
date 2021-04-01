import React, { useState, useEffect } from 'react'
import List12 from 'components/kit/widgets/Lists/12'
import List15 from 'components/kit/widgets/Lists/15'
import Chart2 from './Charts/2'
import PieAlert from './Charts/pieAlert'
import PieOnline from './Charts/pieOnline'
import BarLine from './Charts/barline'
import { Pagination, Avatar, Form } from 'antd'
import InfoModal from '../../device/detail/info'

import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { TIME_FORMAT } from 'constant'
import moment from 'moment'
import { get } from 'lodash'
import './style.scss'

const mapStateToProps = ({ authDevice, user, dispatch }) => {
  let { list, loading, total, preConfirm } = authDevice
  const { list: users, username, email, role } = user
  const usernameOrEmail = username || email
  if (typeof total === 'object') {
    total = total.count
  }

  return { list, loading, total, users, preConfirm, usernameOrEmail, role, dispatch }
}

const DefaultPage = ({ total, usernameOrEmail, role, dispatch }) => {
  const [] = Form.useForm()
  const [modal, setModal] = useState()
  const [name] = useState()
  const [roles] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} thiết bị`
  })
  const [payload, setPayload] = useState({
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

  const batteryCellStatus = []
  for (let i = 1; i < 21; i++) {
    batteryCellStatus.push(
      <div
        key={i}
        className='card cell-item'
        onClick={() => setModal(true)}
        style={{ background: '#f5222d', cursor: 'pointer' }}
      >
        <div className='card-body'>{i}</div>
      </div>
    )
  }
  for (let i = 21; i < 30; i++) {
    batteryCellStatus.push(
      <div
        key={i}
        className='card cell-item'
        onClick={() => setModal(true)}
        style={{ background: '#8c8c8c', cursor: 'pointer' }}
      >
        <div className='card-body'>{i}</div>
      </div>
    )
  }
  for (let i = 30; i < 100; i++) {
    batteryCellStatus.push(
      <div
        key={i}
        className='card cell-item'
        onClick={() => setModal(true)}
        style={{ background: '#389e0d', cursor: 'pointer' }}
      >
        <div className='card-body'>{i}</div>
      </div>
    )
  }
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
                    <PieOnline />
                  </div>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='card'>
                  <div className='card-body'>
                    <PieAlert />
                  </div>
                </div>
              </div>
            </div>
            <h5 className='text-dark mb-4'>Phân tích và Thống kê</h5>
            <div className='card' style={{ paddingTop: 10, paddingLeft: 10 }}>
              <BarLine />
            </div>
            <div className='row'>
              <div className='col-lg-6'>
                {/* <div className='card'>
                <div className='card-body'>
                  <PieAlert />
                </div>
              </div> */}
                <h5 className='text-dark mb-4'>Báo động và Cảnh báo</h5>
                <div className='card'>
                  <div className='card-body'>
                    <List12 />
                  </div>
                </div>
              </div>
              <div className='col-lg-6'>
                {/* <div className='card'>
                <div className='card-body'>
                  <PieOnline />
                </div>
              </div> */}
                <h5 className='text-dark mb-4'>Các cảnh báo gần đây</h5>
                <div className='card'>
                  <div className='card-body'>
                    <List15 />
                  </div>
                </div>
              </div>
              <div className='col-md-12'>
                <h5 className='text-dark mb-4'>Doanh thu</h5>
                <div className='card'>
                  <Chart2 />
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-12'>
            <h5 className='text-dark mb-4'>{role === 'admin' ? 'Hệ thống đã triển khai' : 'Trạng thái ắc quy'}</h5>
            <div className='card'>
              <div className='card-body battery-cell-panel'>
                {batteryCellStatus}
              </div>
              <Pagination className='battery-pagination' total={1000} />
            </div>
          </div>
        </div>
        {modal &&
          <InfoModal modal={modal} setModal={setModal} />}
      </div>
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
