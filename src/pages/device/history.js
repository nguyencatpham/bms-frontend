import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { connect } from 'react-redux'
import { withRouter, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import './style.scss'
import { TIME_FORMAT } from 'constant'
import ReactJson from 'react-json-view'

const mapStateToProps = ({ device, user, dispatch }) => {
  let { list, loading, total, deviceEvents = [] } = device
  const { list: users, username, email } = user
  const usernameOrEmail = username || email
  if (typeof total === 'object') {
    total = total.count
  }

  return { list, loading, total, users, deviceEvents, usernameOrEmail, dispatch }
}

// TODO Temp data while waiting for backend

const DefaultPage = ({ loading, deviceEvents, dispatch }) => {
  const [time] = useState(moment())
  const { id } = useParams()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} thiết bị`
  })

  const columns = [
    {
      title: 'Thời gian',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: '20%',
      render: (text, item) => {
        return <div style={{ whiteSpace: 'nowrap' }}>{moment(text).format(TIME_FORMAT)}</div>
      }
    },
    {
      title: 'Thông báo',
      dataIndex: 'title',
      key: 'title',
      width: '80%',
      render: (text) => {
        return <div style={{ whiteSpace: 'nowrap' }}>{text}</div>
      }
    },
    {
      title: 'Thông số',
      dataIndex: 'metadata',
      key: 'metadata',
      width: '80%',
      render: (text) => {
        return (
          <div style={{ whiteSpace: 'nowrap' }}>
            <ReactJson
              name='metadata'
              displayDataTypes={false}
              src={text}
            />
          </div>)
      }
    }

  ]

  const onTableChange = (pagination) => {
    setPagination(pagination)
  }

  useEffect(() => {
    if (id) {
      dispatch({
        type: 'device/EVENTS',
        payload: {
          id,
          start: (time || moment()).startOf('day').unix(),
          end: (time || moment()).endOf('day').unix(),
          priority: [0, 1, 2, 3, 4, 5],
          isAsc: true,
          limit: 1000
          //  stringId
        }
      })
    }
  }, [id, time])
  return (
    <>
      <div className='DevicePage page'>
        <Helmet title='Thiết bị | Lịch sử hoạt động' />
        <Table
          //   rowSelection={rowSelection}
          className='custom-table table-responsive'
          rowKey={(x) => x.id}
          dataSource={deviceEvents}
          pagination={{ ...pagination, showSizeChanger: true }}
          loading={loading}
          columns={columns}
          onChange={onTableChange}
        // rowClassName={(record) => (record.suspend ? 'color-grey' : '')}
        // ellipsis
        />
      </div>
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
