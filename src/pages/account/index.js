import React, { useState, useEffect } from 'react'
import { Avatar, Input, Select, Table, Button, Form } from 'antd'
import { connect } from 'react-redux'
import { UserOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'
import { withRouter, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { TIME_FORMAT, ROLE } from 'constant'
import moment from 'moment'
import PreConfirm from 'components/pre-confirm'
import { get } from 'lodash'
import './style.scss'

const { Item } = Form
const { Option } = Select
const { Search } = Input

const mapStateToProps = ({ account, user, dispatch }) => {
  let { list, loading, total, preConfirm } = account
  const { list: users, username, email, role } = user
  const usernameOrEmail = username || email
  if (typeof total === 'object') {
    total = total.count
  }
  return { list, loading, total, users, preConfirm, usernameOrEmail, role, dispatch }
}

const DefaultPage = ({ list, loading, total, preConfirm, usernameOrEmail, role, dispatch }) => {
  const [form] = Form.useForm()
  const [modal, setModal] = useState()
  const [name, setName] = useState()
  const [roles, setRoles] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} tài khoản`,
  })
  const [payload, setPayload] = useState({
    skip: pagination.pageSize * (pagination.current - 1),
    limit: pagination.pageSize,
    filter: JSON.stringify({
      include: [{ relation: 'devices' }],
      skip: (pagination.current - 1) * pagination.pageSize,
      limit: pagination.pageSize,
      order: ['created DESC'],
    }),
  })

  const onSearch = (value) => console.log(value)
  const columns = [
    {
      title: 'Tài khoản',
      dataIndex: 'name',
      key: 'name',
      render: (text, item) => {
        if (role === 'admin') {
          return (
            <Link className="break-word" to={`/accounts/${item.id}`}>
              {text || item.username || item.email}
            </Link>
          )
        }
        return text
      },
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (x) => <span className="break-word ">{ROLE[x]}</span>,
    },
    // {
    //   title: 'Hệ thống',
    //   dataIndex: 'devices',
    //   key: 'devices',
    //   render: (devices) => {
    //     const text = get(devices, ['0', 'name'], '---')
    //     return <span className="break-word text-center">{text}</span>
    //   },
    // },
    {
      title: 'Ngày tạo',
      dataIndex: 'created',
      key: 'created',
      render: (x) => {
        return <span className="break-word ">{moment(x).format(TIME_FORMAT)}</span>
      },
    },
    {
      title: (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Search placeholder="Tìm" onSearch={onSearch} style={{ width: '240px' }} />

          <Button style={{ marginLeft: '1rem' }} type="primary">
            <Link className="break-word" to={`/accounts/create`}>
              Thêm
            </Link>
          </Button>
        </div>
      ),
      dataIndex: 'options',
      responsive: ['md'],
    },
    // {
    //   title: 'Ghi chú',
    //   dataIndex: 'note',
    //   key: 'description',
    //   render: (x) => {
    //     return (
    //       <span className="break-word " style={{ color: '#f5222d' }}>
    //         {x}
    //       </span>
    //     )
    //   },
    // },
    // {
    //   title: 'Thao tác',
    //   dataIndex: 'action',
    //   key: 'action',
    //   render: (text, item) => {
    //     return (
    //       <div width="1%" className="action-group break-word">
    //         <div
    //           style={{ fontSize: '1.3rem' }}
    //           className="d-flex justify-content-between align-items-center mx-1"
    //         >
    //           <Link to={`/accounts/${item.id}/update`}>
    //             <EditOutlined className="ico18 ico-blue" />
    //           </Link>
    //           <div>
    //             <CloseOutlined
    //               className="ico18 ico-red text-danger"
    //               onClick={() => setModal(item)}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     )
    //   },
    // },
  ]
  const onTableChange = (pagination) => {
    setPagination(pagination)
    const { filter } = payload
    const _filter = JSON.parse(filter)
    _filter.skip = (pagination.current - 1) * pagination.pageSize
    _filter.limit = pagination.pageSize
    setPayload({ ...payload, filter: JSON.stringify(_filter) })
  }

  const onDelete = ({ id, password }) => {
    dispatch({
      type: 'account/DELETE',
      payload: {
        id,
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
      type: 'account/COUNT',
      payload: { where: (JSON.parse(payload.filter) || {}).where },
    })
    dispatch({
      type: 'account/LIST',
      payload,
    })
  }, [dispatch, payload])

  // const onSearch = (e) => {
  //   if (e.key && e.key !== 'Enter') {
  //     return
  //   }
  //   const and = []
  //   if (name) {
  //     and.push({
  //       or: [
  //         { name: { like: `%${name}%` } },
  //         { username: { like: `%${name}%` } },
  //         { email: { like: `%${name}%` } },
  //       ],
  //     })
  //   }
  //   if (roles.length) {
  //     and.push({ role: { inq: roles } })
  //   }
  //   setPayload({
  //     ...payload,
  //     filter: JSON.stringify({
  //       include: [{ relation: 'devices' }],
  //       where: { and },
  //       skip: 0,
  //       limit: pagination.pageSize,
  //       order: ['created DESC'],
  //     }),
  //   })
  //   // setQuery(and)
  // }
  const rowSelection = {
    type: 'checkbox',
    // selectedRowKeys,
    // onChange: this.onSelectChange,
  }
  return (
    <>
      <div className="AccountPage page">
        <Helmet title="Quản lý tài khoản" />
        <Table
          rowSelection={rowSelection}
          className="custom-table table-responsive"
          rowKey={(x) => x.id}
          dataSource={list}
          pagination={{ ...pagination, showSizeChanger: true }}
          loading={loading}
          columns={columns}
          onChange={onTableChange}
          rowClassName={(record) => (record.suspend ? 'color-grey' : '')}
          ellipsis
        />
      </div>
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
