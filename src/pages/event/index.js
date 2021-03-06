
import React, { useState, useEffect } from 'react'
import { Input, Table, Button, Pagination } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { TIME_FORMAT } from 'constant'
import moment from 'moment'
import { get } from 'lodash'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import jQuery from 'jquery'
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css'
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css'
import style from './style.module.scss'
import './style.scss'

// import './style.scss'
window.jQuery = window.$ = jQuery

const mapStateToProps = ({ event, dispatch }) => {
  let { list, loading, total } = event
  if (typeof total === 'object') {
    total = total.count
  }
  return { list, loading, total, dispatch }
}

const DefaultPage = ({ list, loading, total, dispatch }) => {
  const [name, setName] = useState()
  const [range, setRange] = useState({})
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    // showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} cảnh báo`
  })
  const [payload, setPayload] = useState({
    skip: pagination.pageSize * (pagination.current - 1),
    limit: pagination.pageSize,
    filter: JSON.stringify({
      skip: (pagination.current - 1) * pagination.pageSize,
      limit: pagination.pageSize,
      order: ['timestamp DESC']
    })
  })

  const columns = [
    {
      title: 'Thời gian',
      dataIndex: 'timestamp',
      key: 'timestamp',
      // width: 200,
      render: (x) => {
        return <span className='break-word'>{moment(x).format(TIME_FORMAT)}</span>
      }
    },
    {
      title: 'Hệ thống',
      dataIndex: 'systemId',
      key: 'systemId',
      // width: 200,
      render: (x, item) => {
        return <span className='break-word '>{get(item.metadata, ['name'], 'Chưa xác định')}</span>
      }
    },
    {
      title: 'Giá trị cảnh báo',
      dataIndex: 'type',
      key: 'type',
      // width: 100,
      render: (type, item) => {
        switch (type) {
          case 'RESISTANCE_OVER':
            return <span className='break-word '>{get(item.metadata, ['r'], 'Chưa xác định')}</span>
          case 'FLOATING_VOLTAGE_OVER':
            return <span className='break-word '>{get(item.metadata, ['v0'], 'Chưa xác định')}</span>
          case 'FLOATING_VOLTAGE_LOWER':
            return <span className='break-word '>{get(item.metadata, ['v0'], 'Chưa xác định')}</span>
          case 'OPEN_VOLTAGE_LOWER':
            return <span className='break-word '>{get(item.metadata, ['e'], 'Chưa xác định')}</span>
          case 'OPEN_VOLTAGE_OVER':
            return <span className='break-word '>{get(item.metadata, ['e'], 'Chưa xác định')}</span>
          case 'TEMPERATURE_OVER':
            return <span className='break-word '>{get(item.metadata, ['t'], 'Chưa xác định')}</span>
          case 'TEMPERATURE_LOWER':
            return <span className='break-word '>{get(item.metadata, ['t'], 'Chưa xác định')}</span>
          default:
            return <span className='break-word '>Chưa xác định</span>
        }
      }
    },
    {
      title: 'Nội dung',
      dataIndex: 'title',
      key: 'title',
      // width: 500,
      render: (text, x) => {
        switch (x.priority) {
          case 1:
            return (
              <li className={style.item}>
                <div >
                  <div className={`${style.itemCover} ${style.alertIcon} mr-3`} />
                  <div>
                    <div><strong>{x.title}</strong></div>
                    <div>
                      {`${x.body} vào lúc ${moment(x.timestamp).format(TIME_FORMAT)}`}
                    </div>
                  </div>
                </div>
              </li>
            )
          case 2:
            return (
              <li className={style.item}>
                <div >
                  <div className={`${style.itemCover} ${style.alertIcon} mr-3`} />
                  <div>
                    <div><strong>{x.title}</strong></div>
                    <div>
                      {`${x.body} vào lúc ${moment(x.timestamp).format(TIME_FORMAT)}`}
                    </div>
                  </div>
                </div>
              </li>
            )
          case 0:
          default:
            return (
              <li className={style.item}>
                <div >
                  <div className={`${style.itemCover} ${style.alertIcon} mr-3`} />
                  <div>
                    <div><strong>{x.title}</strong></div>
                    <div>
                      {`${x.body} vào lúc ${moment(x.timestamp).format(TIME_FORMAT)}`}
                    </div>
                  </div>
                </div>
              </li>
            )
        }
      }
    }
  ]
  const onTableChange = pagination => {
    setPagination(pagination)
    const { filter } = payload
    const _filter = JSON.parse(filter)
    _filter.skip = (pagination.current - 1) * pagination.pageSize
    _filter.limit = pagination.pageSize
    setPayload({ ...payload, filter: JSON.stringify(_filter) })
  }

  useEffect(() => {
    if (total !== pagination.total) {
      setPagination({ ...pagination, total })
    }
  }, [total, pagination, setPagination])
  useEffect(() => {
    const start = range.start || new Date(0).toISOString()
    const end = range.end || new Date().toISOString()
    dispatch({
      type: 'event/COUNT',
      payload: {
        where: JSON.stringify({
          timestamp: { between: [start, end] }
        })
      }
    })
    dispatch({
      type: 'event/LIST',
      payload: {
        filter: JSON.stringify({
          skip: (pagination.current - 1) * pagination.pageSize,
          limit: pagination.pageSize,
          where: {
            timestamp: { between: [start, end] }
          },
          order: ['timestamp DESC']
        })
      }
    })
  }, [range, payload, dispatch])

  const onFilter = (event, picker) => {
    console.info(event)
    setRange({
      start: picker.startDate.toISOString(),
      end: picker.endDate.toISOString()
    })
  }

  const onSearch = (e) => {
    if (e.key && e.key !== 'Enter') {
      return
    }
    const and = []
    if (name) {
      and.push({ or: [{ name: { like: `%${name}%` } }, { username: { like: `%${name}%` } }, { email: { like: `%${name}%` } }] })
    }
    setPayload({
      ...payload,
      filter: JSON.stringify({
        where: { and },
        skip: 0,
        limit: pagination.pageSize,
        order: ['timestamp DESC']
      })
    })
    // setQuery(and)
  }
  return (
    <>
      <div className='event' onKeyUp={onSearch}>
        <Helmet title='Thống kê cảnh báo' />
        <div className='row'>
          <div className='col-lg-12 col-md-12'>
            <h5 className='text-dark mb-4 text-uppercase'>Thống kê cảnh báo</h5>
            <div className='card'>
              <div className='card-body d-flex justify-content-between flex-column flex-md-row'>
                <div className="d-flex justify-content-between w-100 flex-column flex-md-row">
                  <div className='w-100'>
                    <DateRangePicker
                      onApply={onFilter}
                    >
                      <input style={{borderRadius: '8px'}} type='text' className='form-control' />
                    </DateRangePicker>
                  </div>
                  <div className='w-100 ml-md-3 ml-0 mt-3 mt-md-0'>
                    <Input
                      style={{ width: '100%' }}
                      placeholder='Hệ thống'
                      value={name}
                      onChange={e => setName(e.target.value)}
                      allowClear
                    />
                  </div>
                </div>
                <div className='ml-md-3 ml-0 mt-3 mt-md-0'>
                  <Button className='btn btn-primary btn-filter' autoFocus onClick={onSearch}><i className='i_search small' />Tìm</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <Table
              className='custom-table table table-responsive'
              rowKey={x => x.timestamp}
              dataSource={list}
              pagination={{ ...pagination, showSizeChanger: true, responsive: true }}
              loading={loading}
              columns={columns}
              onChange={onTableChange}
              rowClassName={(record) => {
                switch (record.priority) {
                  case 3:
                    return `${style.offline} ${style.eventTr} `
                  case 2:
                  case 1:
                  case 'ONLINE':
                  default:
                    return ` ${style.eventTr} `
                }
              }}
              ellipsis
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
