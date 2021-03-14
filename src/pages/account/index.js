
import React, { useState, useEffect } from 'react'
import { Input, Select, Table, Button, Form } from 'antd'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { TIME_FORMAT, ROLE } from 'constant'
import moment from 'moment'
import PreConfirm from 'components/pre-confirm'
import { get } from 'lodash'
import './style.scss'

const { Item } = Form
const { Option } = Select

const mapStateToProps = ({ account, user, dispatch }) => {
  const { list, loading, total, preConfirm } = account
  const { list: users, username, email } = user
  const usernameOrEmail = username || email

  return { list, loading, total, users, preConfirm, usernameOrEmail, dispatch }
}

const DefaultPage = ({ list, loading, total, preConfirm, usernameOrEmail, dispatch }) => {
  const [form] = Form.useForm()
  const [modal, setModal] = useState()
  const [name, setName] = useState()
  const [roles, setRoles] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} tài khoản`
  })
  const [payload, setPayload] = useState({
    skip: pagination.pageSize * (pagination.current - 1),
    limit: pagination.pageSize,
    filter: JSON.stringify({ include: [{ relation: 'devices' }] })
  })

  const columns = [
    {
      title: 'Tài khoản',
      dataIndex: 'name',
      key: 'name',
      render: (text, item) => <Link className='break-word' to={`/accounts/${item.id}`}>{text || item.username || item.email}</Link>

    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (x) => <span className='break-word '>{ROLE[x]}</span>
    },
    {
      title: 'Hệ thống',
      dataIndex: 'devices',
      key: 'devices',
      render: (devices) => {
        const text = get(devices, ['0', 'name'], '---')
        return <span className='break-word text-center'>{text}</span>
      }
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created',
      key: 'created',
      render: (x) => {
        return <span className='break-word '>{moment(x).format(TIME_FORMAT)}</span>
      }
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'description',
      render: (x) => {
        return <span className='break-word ' style={{ color: '#f5222d' }}>{x}</span>
      }
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      render: (text, item) => {
        return (
          <div className='action-group break-word'>
            <div>
              <Link to={`/accounts/${item.id}/update`}><EditOutlined className='ico18 ico-blue mr20' /></Link>
              <CloseOutlined className='ico18 ico-red' onClick={() => setModal(item)} />

            </div>
          </div>
        )
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

  const onDelete = ({ id, password }) => {
    dispatch({
      type: 'account/DELETE',
      payload: {
        id,
        body: {
          username: usernameOrEmail,
          password
        }
      }
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
      payload: { where: (JSON.parse(payload.filter) || {}).where }
    })
    dispatch({
      type: 'account/LIST',
      payload
    })
  }, [dispatch, payload])

  const onSearch = (e) => {
    if (e.key && e.key !== 'Enter') {
      return
    }
    const and = []
    if (name) {
      and.push({ or: [{ name: { like: `%${name}%` } }, { username: { like: `%${name}%` } }, { email: { like: `%${name}%` } }] })
    }
    if (roles.length) {
      and.push({ role: { inq: roles } })
    }
    setPayload({
      ...payload,
      filter: JSON.stringify({ include: [{ relation: 'devices' }], where: { and } })
    })
    // setQuery(and)
  }
  return (
    <>
      <div className='account' onKeyUp={onSearch}>
        <Helmet title='Quản lý tài khoản' />
        <div className='row'>
          <div className='col-lg-12 col-md-12'>
            <h5 className='text-dark mb-4 text-uppercase'>Quản lý tài khoản</h5>
            <div className='card'>
              <div className='card-body row'>
                <div className='col-md-4'>
                  <Input
                    style={{ width: '100%' }}
                    placeholder='Nhập tên người dùng'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    allowClear
                  />
                </div>
                <div className='col-md-4'>
                  <Select
                    mode='multiple'
                    allowClear
                    style={{ width: '100%' }}
                    placeholder='Vai trò'
                    value={roles}
                    onChange={setRoles}
                  >
                    {Object.keys(ROLE).map(x => (
                      <Option key={x} value={x}>{ROLE[x]}</Option>
                    ))}
                  </Select>
                </div>
                <div className='col-md-4'>
                  <Button className='btn btn-primary btn-filter' autoFocus onClick={onSearch}><i className='i_search small' />Tìm</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='account-top'>
          <div className='title-header'>
            <div className='grid-view'>
              <div className='' />
              <div className='text-right fl-right' style={{ marginBottom: 10 }}>
                <Link className='btn btn-primary' to='/accounts/create'><i className='i_user ico25' />Thêm tài khoản</Link>
              </div>
            </div>
          </div>
        </div> */}
        <div className='card'>
          <div className='card-body'>
            <Table
              className='table-responsive'
              rowKey={x => x.id}
              dataSource={list}
              pagination={{ ...pagination, showSizeChanger: true }}
              loading={loading}
              columns={columns}
              onChange={onTableChange}
              rowClassName={(record) => record.suspend ? 'color-grey' : ''}
              ellipsis
            />
          </div>
        </div>
      </div>
      {modal &&
        <Form
          form={form}
          onFinish={onDelete}
        >
          <PreConfirm
            loading={loading}
            visible={!!modal}
            onOk={() => form.submit()}
            onCancel={() => setModal(false)}
            preConfirm={preConfirm}
          />
          <Item
            name='id'
            label=''
            initialValue={modal.id}
          >
            <Input style={{ display: 'none' }} />
          </Item>
        </Form>}
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))