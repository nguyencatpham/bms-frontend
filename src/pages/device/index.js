import React, { useState, useEffect } from 'react'
import { Input, Table, Button, Form, Dropdown, Menu } from 'antd'
import { connect } from 'react-redux'
import { EllipsisOutlined } from '@ant-design/icons'
import { withRouter, useHistory } from 'react-router-dom'
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

const DefaultPage = ({ list, loading, total, preConfirm, usernameOrEmail, dispatch }) => {
  const history = useHistory()
  const [form] = Form.useForm()
  const [modal, setModal] = useState()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} thiết bị`
  })
  const [payload, setPayload] = useState({
    filter: JSON.stringify({
      include: [
        {
          relation: 'devices',
          scope: {
            include: [
              {
                relation: 'blocks'
              },
              {
                relation: 'units'
              }
            ]
          }
        }
      ],
      skip: (pagination.current - 1) * pagination.pageSize,
      limit: pagination.pageSize,
      order: ['updated DESC, created DESC']
    })
  })

  const onSearch = (value) => console.info(value)
  const columns = [
    {
      title: '',
      dataIndex: 'online',
      key: 'online',
      render: (text, item) => {
        const online = get(item.devices, ['0', 'online'])
        return <span className={`square ${online ? 'square-online' : 'square-offline'}`} />
      }
    }, {
      title: 'Hệ thống',
      dataIndex: 'name',
      key: 'name',
      render: (text, item) => {
        const device = get(item.devices, ['0'], {})
        const name = get(device, ['name'], 'Chưa kích hoạt')
        if (device) {
          return (
            // <Link className='break-word' to={`/devices/${item.uuid}`}>
            <p>{name}</p>
            // </Link>
          )
        } else {
          return <span>{name}</span>
        }
      }
    },
    {
      title: 'Site',
      dataIndex: 'siteName',
      key: 'siteName'
    }, {
      title: 'Mã thiết bị',
      dataIndex: 'macAddress',
      key: 'macAddress'
    },
    {
      title: 'Cập nhật lân cuối',
      dataIndex: 'updated',
      key: 'updated',
      render: (text, item) => {
        return (
          <span className='break-word '>
            {text ? moment(text).format(TIME_FORMAT) : '---'}
          </span>
        )
      }
    },
    {
      title: (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Search placeholder='Tìm' onSearch={onSearch} style={{ width: '240px' }} />
          <Button style={{ marginLeft: '1rem' }} type='primary' onClick={() => history.push('devices/create')}>
            <span className='break-word'>
              Thêm
            </span>
          </Button>
        </div>
      ),
      dataIndex: 'options',
      responsive: ['md'],
      render: (text, item) => {
        return (
          <div className='device-options'>
            <Dropdown
              overlay={
                <Menu style={{ minWidth: '100px' }}>
                  <Menu.Item key='0' onClick={() => history.push(`/devices/${item.uuid}/update`)}>
                    <span className='break-word'>
                      Sửa
                    </span>
                  </Menu.Item>
                  <Menu.Item key='1' onClick={() => history.push(`/devices/${item.uuid}/stats`)}>
                    <span className='break-word'>
                      Cấu hình
                    </span>
                  </Menu.Item>
                  <Menu.Item key='2' onClick={() => history.push(`/devices/${item.uuid}/history`)}>
                    <span className='break-word'>
                      Lịch sử hoạt động
                    </span>
                  </Menu.Item>
                  <Menu.Item key='3' onClick={() => history.push(`/devices/${item.uuid}/config`)}>
                    <span className='break-word'>
                      Load config
                    </span>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item onClick={() => setModal(item)} key='4'>
                    Xóa
                  </Menu.Item>
                </Menu>
              }
              trigger={['click']}
            >
              <EllipsisOutlined className='icon' onClick={(e) => e.preventDefault()} />
            </Dropdown>
          </div>
        )
      }
    }
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

  // const onSearch = (e) => {
  //   if (e.key && e.key !== 'Enter') {
  //     return
  //   }
  //   const and = []
  //   if (name) {
  //     and.push({
  //       or: [
  //         { name: { like: `%${name}%` } },
  //         { macAddress: { like: `%${name}%` } },
  //         { model: { like: `%${name}%` } },
  //       ],
  //     })
  //   }
  //   if (roles.length) {
  //     and.push({ role: { inq: roles } })
  //   }
  //   setPayload({
  //     ...payload,
  //     filter: JSON.stringify({
  //       include: [
  //         {
  //           relation: 'devices',
  //           scope: {
  //             include: [
  //               {
  //                 relation: 'systems',
  //                 scope: {
  //                   include: [
  //                     {
  //                       relation: 'blocks',
  //                     },
  //                   ],
  //                 },
  //               },
  //             ],
  //           },
  //         },
  //       ],
  //       where: { and },
  //       skip: 0,
  //       limit: pagination.pageSize,
  //       order: ['created DESC'],
  //     }),
  //   })
  // }

  return (
    <>
      <div className='DevicePage page'>
        <Helmet title='Quản lý thiết bị' />
        <Table
          // rowSelection={rowSelection}
          className='custom-table table-responsive'
          rowKey={(x) => x.uuid}
          dataSource={list}
          pagination={{ ...pagination, showSizeChanger: true }}
          loading={loading}
          columns={columns}
          onChange={onTableChange}
          rowClassName={(record) => (record.suspend ? 'color-grey' : '')}
          ellipsis
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
          <Item name='id' label='' initialValue={modal}>
            <Input style={{ display: 'none' }} />
          </Item>
        </Form>
      )}
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
