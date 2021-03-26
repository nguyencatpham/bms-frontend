
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

const mapStateToProps = ({ authDevice, user, dispatch }) => {
  const { list, loading, total, preConfirm } = authDevice
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
      }]
    })
  })

  const columns = [
    {
      title: '',
      dataIndex: 'index',
      key: 'index',
      render: (text, item) => {
        const device = get(item.devices, ['0'], {})

        return (
          <Link className='break-word' to={device.systems ? `/devices/${item.uuid}` : '#'}>
            <Avatar
              shape='square'
              size='large'
              icon={<UserOutlined />}
              src='/resources/images/system.png'
            />
          </Link>
        )
      }
    },
    {
      title: 'Hệ thống',
      dataIndex: 'name',
      key: 'name',
      render: (text, item) => {
        const device = get(item.devices, ['0'], {})
        const name = get(device.systems, ['0', 'name'], 'Chưa kích hoạt')

        if (device.systems) {
          return <Link className='break-word' to={`/devices/${item.uuid}`}>{name}</Link>
        } else {
          return <span>{name}</span>
        }
      }
    },
    {
      title: 'Mã thiết bị',
      dataIndex: 'macAddress',
      key: 'macAddress'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'online',
      key: 'online',
      render: (text, item) => {
        const online = get(item.devices, ['0', 'online'])
        return <div className={`square ${online ? 'square-online' : 'square-offline'}`} />
      }
    },
    {
      title: 'Cập nhật lân cuối',
      dataIndex: 'lastUpdateStatus',
      key: 'lastUpdateStatus',
      render: (text, item) => {
        const lastUpdateStatus = get(item.devices, ['0', 'lastUpdateStatus'])
        return <span className='break-word '>{lastUpdateStatus ? moment(text).format(TIME_FORMAT) : '---'}</span>
      }
    },
    {
      title: 'Thời gian đăng ký',
      dataIndex: 'created',
      key: 'created',
      render: (text, item) => {
        const created = get(item.devices, ['0', 'created'])
        return <span className='break-word '>{created ? moment(text).format(TIME_FORMAT) : '---'}</span>
      }
    },
    {
      title: 'Phiên bản',
      dataIndex: 'firmwareVersion',
      key: 'firmwareVersion',
      render: (text, item) => {
        const name = get(item.devices, ['0', 'firmwareVersion'])
        return <span>{name || '---'}</span>
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
              <CloseOutlined className='ico18 ico-red' onClick={() => setModal(item.uuid)} />

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

  const onDelete = ({ password }) => {
    dispatch({
      type: 'authDevice/DELETE',
      payload: {
        id: modal,
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
      type: 'authDevice/COUNT',
      payload: { where: (JSON.parse(payload.filter) || {}).where }
    })
    dispatch({
      type: 'authDevice/LIST',
      payload
    })
  }, [dispatch, payload])

  const onSearch = (e) => {
    if (e.key && e.key !== 'Enter') {
      return
    }
    const and = []
    if (name) {
      and.push({ or: [{ name: { like: `%${name}%` } }, { macAddress: { like: `%${name}%` } }, { model: { like: `%${name}%` } }] })
    }
    if (roles.length) {
      and.push({ role: { inq: roles } })
    }
    setPayload({
      ...payload,
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
        where: { and }
      })
    })
    // setQuery(and)
  }
  return (
    <>
      <div className='device-page' onKeyUp={onSearch}>
        <Helmet title='Quản lý thiết bị' />
        <div className='row'>
          <div className='col-lg-12 col-md-12'>
            <h5 className='text-dark mb-4 text-uppercase'>Quản lý thiết bị</h5>
            <div className='card'>
              <div className='card-body row'>
                <div className='col-md-8'>
                  <Input
                    style={{ width: '100%' }}
                    placeholder='Nhập tên hoặc mã thiết bị, hệ thống'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    allowClear
                  />
                </div>
                <div className='col-md-4'>
                  <Button className='btn btn-primary btn-filter' autoFocus onClick={onSearch}><i className='i_search small' />Tìm</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
            initialValue={modal}
          >
            <Input style={{ display: 'none' }} />
          </Item>
        </Form>}
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
