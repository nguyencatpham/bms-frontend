import React, { useState, useEffect } from 'react'
import { Input, Table, Form, Button } from 'antd'
import { connect } from 'react-redux'
import { withRouter, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import PreConfirm from 'components/pre-confirm'
import './style.scss'

const { Item } = Form

const mapStateToProps = ({ device, authDevice, user, dispatch }) => {
  let { list, loading, total, preConfirm } = authDevice
  const { detail = {} } = device
  const { list: users, username, email } = user
  const usernameOrEmail = username || email
  if (typeof total === 'object') {
    total = total.count
  }

  return { list, loading, total, users, preConfirm, usernameOrEmail, detail, dispatch }
}

const DefaultPage = ({ loading, total, preConfirm, usernameOrEmail, detail, dispatch }) => {
  const {
    name,
    timezone,
    siteName,
    block,
    unit,
    r1,
    r2,
    rUpper,
    vUpper,
    eUpper
  } = detail
  const data = [
    { id: 1, key: 'Name', value: name },
    { id: 2, key: 'Timezone', value: timezone },
    { id: 3, key: 'Size Name', value: siteName },
    { id: 4, key: 'Block', value: block },
    { id: 5, key: 'Unit', value: unit },
    { id: 6, key: 'R1', value: r1 },
    { id: 7, key: 'R2', value: r2 },
    { id: 8, key: 'RUpper', value: rUpper },
    { id: 9, key: 'VUpper', value: vUpper },
    { id: 10, key: 'EUpper', value: eUpper }
  ]
  const [form] = Form.useForm()
  const { id } = useParams()
  const [modal, setModal] = useState()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} thiết bị`
  })
  const [payload] = useState({
    id,
    filter: JSON.stringify({
      include: [
        {
          relation: 'blocks'
        }
      ],
      skip: (pagination.current - 1) * pagination.pageSize,
      limit: pagination.pageSize,
      order: ['created DESC']
    })
  })

  const columns = [
    {
      title: 'Thông số',
      dataIndex: 'key',
      key: 'key',
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
      title: 'Giá trị',
      dataIndex: 'value',
      key: 'value',
      width: '80%',

      render: (text) => {
        return <div style={{ whiteSpace: 'nowrap' }}>{text}</div>
      }
    }
  ]
  const fwUpdate = () => {
    dispatch({
      type: 'device/FWUPDATE',
      payload: {
        id
      }
    })
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
      type: 'device/DETAIL',
      payload
    })
  }, [dispatch, payload])

  return (
    <>
      <div className='DevicePage page'>
        <Helmet title='Thiết bị | Cấu hình' />
        <Table
          //   rowSelection={rowSelection}
          // className="custom-table table-responsive"
          rowKey={(x) => x.id}
          dataSource={data}
          // pagination={{ ...pagination, showSizeChanger: true }}
          // loading={loading}
          columns={columns}
          // onChange={onTableChange}
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
          <Item name='id' label='' initialValue={modal}>
            <Input style={{ display: 'none' }} />
          </Item>
        </Form>
      )}
      <div className='text-center'>
        <Button type='primary' onClick={() => fwUpdate()}>
          <i className='i_save_36 ico25' />
          <strong>Firmware Update</strong>
        </Button>
      </div>
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
