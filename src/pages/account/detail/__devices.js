
import React, { useState, useEffect } from 'react'
import { Input, Table, Button, Form } from 'antd'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { withRouter, useParams, Link } from 'react-router-dom'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { TIME_FORMAT } from 'constant'
import moment from 'moment'
import PreConfirm from 'components/pre-confirm'
import '../style.scss'

const { Item } = Form
const { Search } = Input

const mapStateToProps = ({ device, dispatch }) => {
  const { list, loading, total } = device

  return { list, loading, total, dispatch }
}

const DefaultPage = ({ list, loading, total, preConfirm, usernameOrEmail, dispatch }) => {
  const [form] = Form.useForm()
  const { id } = useParams()
  const [modal, setModal] = useState()
  const [name, setName] = useState()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} tài khoản`
  })
  const [payload, setPayload] = useState({
    skip: pagination.pageSize * (pagination.current - 1),
    limit: pagination.pageSize,
    filter: JSON.stringify({ include: [{ relation: 'systems' }] })
  })

  const columns = [
    {
      title: 'Hệ thống',
      dataIndex: 'name',
      key: 'name',
      render: (text, item) => <Link className='break-word' to={`/devices/${item.id}`}>{text || item.macAddress}</Link>

    },
    {
      title: 'Trạng thái',
      dataIndex: 'online',
      key: 'online',
      render: (x) => <span className='break-word '>{x ? 'Bình thường' : 'Mất kết nối'}</span>
    },
    {
      title: 'Cập nhật lân cuối',
      dataIndex: 'lastUpdateStatus',
      key: 'lastUpdateStatus',
      render: (x) => {
        return <span className='break-word '>{moment(x).format(TIME_FORMAT)}</span>
      }
    },
    {
      title: 'Thời gian đăng ký',
      dataIndex: 'created',
      key: 'created',
      render: (x) => {
        return <span className='break-word '>{moment(x).format(TIME_FORMAT)}</span>
      }
    },
    {
      title: 'Version',
      dataIndex: 'firmwareVersion',
      key: 'firmwareVersion'
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      render: (text, item) => {
        return (
          <div className='action-group break-word'>
            <div>
              <Link to={`/devices/${item.id}/update`}><EditOutlined className='ico18 ico-blue mr20' /></Link>
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
      type: 'device/DELETE',
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
      type: 'account/COUNT_DEVICES',
      payload: { id, where: (JSON.parse(payload.filter) || {}).where }
    })
    dispatch({
      type: 'account/GET_DEVICES',
      payload: { ...payload, id }
    })
  }, [dispatch, payload])

  const onSearch = (e) => {
    if (e.key && e.key !== 'Enter') {
      return
    }
    const and = []
    if (name) {
      and.push({ or: [{ name: { like: `%${name}%` } }, { macAddress: { like: `%${name}%` } }, { id: { like: `%${name}%` } }] })
    }
    setPayload({
      ...payload,
      filter: JSON.stringify({ include: [{ relation: 'systems' }], where: { and } })
    })
    // setQuery(and)
  }
  return (
    <>
      <div className='device' onKeyUp={onSearch}>
        <Helmet title='Quản lý tài khoản' />
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
