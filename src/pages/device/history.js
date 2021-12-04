import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { connect } from 'react-redux'
import { withRouter, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import './style.scss'

const mapStateToProps = ({ device, user, dispatch }) => {
  let { list, loading, total, blockEvents = [] } = device
  const { list: users, username, email } = user
  const usernameOrEmail = username || email
  if (typeof total === 'object') {
    total = total.count
  }

  return { list, loading, total, users, blockEvents, usernameOrEmail, dispatch }
}

// TODO Temp data while waiting for backend

const DefaultPage = ({ loading, blockEvents, dispatch }) => {
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
      dataIndex: 'time',
      key: 'time',
      width: '20%',
      render: (text) => {
        return <div style={{ whiteSpace: 'nowrap' }}>{text}</div>
      }
      // render: (text, item) => {
      //   const device = get(item.devices, ['0'], {})
      //   const name = get(device.systems, ['0', 'name'], 'Chưa kích hoạt')

      //   if (device.systems) {
      //     return (
      //       <Link className="break-word" to={`/devices/${item.uuid}`}>
      //         {name}
      //       </Link>
      //     )
      //   } else {
      //     return <span>{name}</span>
      //   }
      // },
    },
    {
      title: 'Thông báo',
      dataIndex: 'message',
      key: 'message',
      width: '80%',
      render: (text) => {
        return <div style={{ whiteSpace: 'nowrap' }}>{text}</div>
      }
    }

  ]

  const onTableChange = (pagination) => {
    setPagination(pagination)
  }

  useEffect(() => {
    if (id) {
      dispatch({
        type: 'device/BLOCK_EVENTS',
        payload: {
          id,
          start: time.startOf('day').unix(),
          end: time.endOf('day').unix(),
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
          dataSource={blockEvents.map(x => ({
            time: x.time,
            message: x.body
          }))}
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
