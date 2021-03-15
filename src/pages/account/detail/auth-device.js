
import React, { useState, useEffect } from 'react'
import { Input, Table, Button, Form } from 'antd'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { withRouter, useParams, Link } from 'react-router-dom'
import PreConfirm from 'components/pre-confirm'
import '../style.scss'
import { get } from 'lodash'
import { ROLE } from 'constant'

const { Item } = Form
const { Search } = Input

const mapStateToProps = ({ authDevice, user, dispatch }) => {
  const { list, loading, total } = authDevice
  const { role } = user
  return { list, loading, total, role, dispatch }
}

const DefaultPage = ({ list, loading, total, role, preConfirm, usernameOrEmail, dispatch }) => {
  const [form] = Form.useForm()
  const { id } = useParams()
  const [modal, setModal] = useState()
  const [name, setName] = useState()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} thiết bị`
  })
  const [payload, setPayload] = useState({
    skip: pagination.pageSize * (pagination.current - 1),
    limit: pagination.pageSize,
    filter: JSON.stringify({
      include: [{ relation: 'devices' }],
      where: { userId: id }
    })
  })

  const columns = [
    {
      title: 'Hệ thống',
      dataIndex: 'name',
      key: 'name',
      render: (text, item) => {
        const name = get(item.devices, ['0', 'name'], 'Chưa kích hoạt')
        const id = get(item.devices, ['0', 'id'])
        if (id) {
          return <Link className='break-word' to={`/devices/${id}`}>{name}</Link>
        } else {
          return <span>{name}</span>
        }
      }
    },
    {
      title: 'Mã thiết bị',
      dataIndex: 'macAddress',
      key: 'macAddress',
      render: (text, item) => <Link className='break-word' to={`/devices/${item.id}`}>{text || item.macAddress}</Link>
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
        const name = get(item.devices, ['0', 'lastUpdateStatus'])
        return <span>{name}</span>
      }
    },
    {
      title: 'Thời gian đăng ký',
      dataIndex: 'created',
      key: 'created',
      render: (text, item) => {
        const name = get(item.devices, ['0', 'created'])
        return <span>{name}</span>
      }
    },
    {
      title: 'Phiên bản',
      dataIndex: 'firmwareVersion',
      key: 'firmwareVersion',
      render: (text, item) => {
        const name = get(item.devices, ['0', 'firmwareVersion'])
        return <span>{name}</span>
      }
    }
  ]
  if (ROLE[role] === ROLE.admin) {
    columns.push({
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      render: (text, item) => {
        const isAssigned = item.userId === +id
        return (
          <div className='action-group break-word'>
            <div>
              <Button
                style={{
                  backgroundColor: isAssigned ? '#f5222d' : '#4a7cf3',
                  color: 'white'
                }}
                type={isAssigned ? 'text' : 'primary'}
                onClick={() => attachDevice({ id: item.uuid, isAssigned, userId: id })}
              >
                {isAssigned ? 'Gỡ' : 'Gắn'} thiết bị
              </Button>
            </div>
          </div>
        )
      }
    })
  }
  const onTableChange = pagination => {
    setPagination(pagination)
    const { filter } = payload
    const _filter = JSON.parse(filter)
    _filter.skip = (pagination.current - 1) * pagination.pageSize
    _filter.limit = pagination.pageSize
    setPayload({ ...payload, filter: JSON.stringify(_filter) })
  }

  const attachDevice = ({ id, isAssigned, userId }) => {
    dispatch({
      type: 'authDevice/ATTACH',
      payload: {
        id,
        body: {
          assign: !isAssigned,
          userId
        }
      }
    })
  }
  const onDelete = ({ id, password }) => {
    dispatch({
      type: 'authDevice/DELETE',
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
      type: 'authDevice/COUNT',
      payload: { id, where: (JSON.parse(payload.filter) || {}).where }
    })
    dispatch({
      type: 'authDevice/LIST',
      payload: { ...payload, id }
    })
  }, [dispatch, payload])

  const onSearch = (e) => {
    if (e.key && e.key !== 'Enter') {
      return
    }
    const and = []
    if (name) {
      and.push({ or: [{ model: { like: `%${name}%` } }, { macAddress: { like: `%${name}%` } }, { serialId: { like: `%${name}%` } }] })
    }
    and.push({ or: [{ userId: null }, { userId: id }] })
    setPayload({
      ...payload,
      filter: JSON.stringify({
        include: [{ relation: 'devices' }],
        where: { and }
      })
    })
    // setQuery(and)
  }
  return (
    <>
      <div className='auth-device' onKeyUp={onSearch}>
        <Helmet title='Quản lý thiết bị' />
        <div className='row'>
          <div className='col-lg-12 col-md-12'>
            <div className='card'>
              <div className='card-body row'>
                <div className='col-md-8'>
                  <Search
                    style={{ width: '100%' }}
                    placeholder='Tìm theo tên hoặc mã thiết bị...'
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
              rowKey={x => x.uuid}
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
