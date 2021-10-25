import React, { useState, useEffect } from 'react'
import { Avatar, Input, Table, Button, Form, Dropdown, Menu } from 'antd'
import { connect } from 'react-redux'
import { UserOutlined, CloseOutlined, EllipsisOutlined } from '@ant-design/icons'
import { withRouter, Link, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { TIME_FORMAT } from 'constant'
import moment from 'moment'
import PreConfirm from 'components/pre-confirm'
import { get } from 'lodash'
import './style.scss'

const { Item } = Form
const { Search } = Input

const mapStateToProps = ({ authDevice, user, dispatch }) => {
  let { list, loading, total, preConfirm } = authDevice
  const { list: users, username, email } = user
  const usernameOrEmail = username || email
  if (typeof total === 'object') {
    total = total.count
  }

  return { list, loading, total, users, preConfirm, usernameOrEmail, dispatch }
}

// TODO Temp data while waiting for backend
const tempData = [
  { id: 1, time: '23/09/2021 10:36', message: 'Thiết bị kết nối lại' },
  { id: 2, time: '23/09/2021 10:36', message: 'Thiết bị kết nối lại' },
]

const DefaultPage = ({ list, loading, total, preConfirm, usernameOrEmail, dispatch }) => {
  const history = useHistory();
  const [form] = Form.useForm()
  const [modal, setModal] = useState()
  const [name, setName] = useState()
  const [roles] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} thiết bị`,
  })
  const [payload, setPayload] = useState({
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

  const onSearch = (value) => console.log(value)
  const columns = [
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      width: '20%',
      render: (text, item) => {
        return <div style={{whiteSpace: 'nowrap',}}>{text}</div>
      },
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
      render: (text, item) => {
        return <div style={{whiteSpace: 'nowrap',}}>{text}</div>
      },
    },
    
  ]

  const onTableChange = (pagination) => {
    setPagination(pagination)
    const { filter } = payload
    const _filter = JSON.parse(filter)
    _filter.skip = (pagination.current - 1) * pagination.pageSize
    _filter.limit = pagination.pageSize
    setPayload({ ...payload, filter: JSON.stringify(_filter) })
  }

  const onDelete = ({ password }) => {
    dispatch({
      type: 'authDevice/DELETE',
      payload: {
        id: modal,
        body: {
          username: usernameOrEmail,
          password,
        },
      },
    })
    setModal(false)
  }
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
  }, [dispatch, payload])

  return (
    <>
      <div className="DevicePage page">
        <Helmet title="Thiết bị | Lịch sử hoạt động" />
        <Table
        //   rowSelection={rowSelection}
          className="custom-table table-responsive"
          rowKey={(x) => x.id}
          dataSource={tempData}
          // pagination={{ ...pagination, showSizeChanger: true }}
          loading={loading}
          columns={columns}
          onChange={onTableChange}
          // rowClassName={(record) => (record.suspend ? 'color-grey' : '')}
          // ellipsis
        />
      </div>
      {modal && (
        <Form form={form} onFinish={onDelete}>
          <PreConfirm
            loading={loading}
            visible={!!modal}
            onOk={() => form.submit()}
            onCancel={() => setModal(false)}
            preConfirm={preConfirm}
          />
          <Item name="id" label="" initialValue={modal}>
            <Input style={{ display: 'none' }} />
          </Item>
        </Form>
      )}
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
