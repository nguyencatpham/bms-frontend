import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Button, Modal, Table, Form, Tabs } from 'antd'
import { connect } from 'react-redux'
import { withRouter, useParams } from 'react-router-dom'
import { history } from 'index'
import General from 'components/kit/widgets/General/10v1'
import General1 from 'components/kit/widgets/General/1'
import General12v1 from 'components/kit/widgets/General/12v1'
import List19 from 'components/kit/widgets/Lists/19'
import faker from 'faker'
import ChartPage from './chart'
import '../style.scss'
import { get } from 'lodash'

const { Item } = Form
const { TabPane } = Tabs

const mapStateToProps = ({ authDevice, dispatch }) => {
  const { loading, detail } = authDevice
  const device = get(detail.devices, ['0'], {})
  const system = get(device.systems, ['0'], {})
  const blocks = system.blocks

  return { loading, detail, device, system, blocks, dispatch }
}

const DefaultPage = ({ loading, detail, device, system, blocks, dispatch }) => {
  const { id } = useParams()
  const [form] = Form.useForm()
  const { macAddress, uuid, serialId, model, updated, devices = [] } = detail
  const { name } = system
  const [showmodal, setShowmodal] = useState()
  const [tabKey, setTabKey] = useState('1')
  const onDelete = (suspend) => {
    dispatch({
      type: 'device/BAN',
      payload: {
        id,
        suspend
      }
    })
    setShowmodal(false)
  }
  const onFinish = body => {
    console.log('bod', body)
    dispatch({
      type: 'device/SET_PASSWORD',
      payload: {
        id,
        password: body.password
      }
    })
  }
  const changeTab = key => {
    setTabKey(key)
  }
  useEffect(() => {
    dispatch({
      type: 'authDevice/DETAIL',
      payload: {
        id,
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
      }
    })
  }, [id, dispatch])
  const actions = [{
    id: '__remove',
    name: 'Xóa thiết bị',
    color: '#f5222d',
    action: () => { setShowmodal(true) }
  }]
  const supportCasesTableData = [
    {
      key: '1',
      type: 'V0',
      amount: faker.random.number()
    },
    {
      key: '2',
      type: 'E',
      amount: faker.random.number()
    },
    {
      key: '3',
      type: 'SoC',
      amount: faker.random.number()
    },
    {
      key: '4',
      type: 'R',
      amount: faker.random.number()
    },
    {
      key: '5',
      type: 'T',
      amount: faker.random.number()
    },
    {
      key: '6',
      type: 'Thời hạn bảo hành',
      amount: ` Còn lại ${faker.random.number(24)} tháng`
    },
    {
      key: '7',
      type: 'Ngày sản xuất ',
      amount: faker.date.recent().toLocaleDateString()
    }

  ]
  const supportCasesTableColumns = [
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Thông số',
      key: 'amount',
      dataIndex: 'amount',
      render: amount => {
        if (amount === 'Negative') {
          return <span className='text-danger font-weight-bold'>{amount}</span>
        }
        return <span className='text-primary font-weight-bold'>{amount}</span>
      }
    }
  ]
  return (
    <>
      <div className='detail-page device'>
        <Helmet title='Thông tin thiết bị' />
        {/* <h3 className='form-title'><i className='i_user_8 ico30' />QUẢN LÝ TÀI KHOẢN</h3> */}
        <div className='row'>
          <div className='col-xl-4 col-lg-12'>
            <div className='card profile-general'>
              <div className='card-body'>
                <General
                  avatar='/resources/images/battery.png'
                  name={name || macAddress || uuid}
                  role={updated}
                  actions={actions}
                />
              </div>
            </div>
            <div className='card text-white bg-primary'>
              <General12v1 />
            </div>
            <div className='card'>
              <div className='card-header border-0 pb-0'>
                <div className='cui__utils__heading mb-0'>
                  <strong className='text-uppercase font-size-16'>Thông tin chi tiết</strong>
                </div>
              </div>
              <div className='card-body'>
                <div className='mb-3'>
                  <Table
                    dataSource={supportCasesTableData}
                    columns={supportCasesTableColumns}
                    pagination={false}
                  />
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-body'>
                <List19 />
              </div>
            </div>
          </div>
          <div className='col-xl-8 col-lg-12'>
            <div className='card profile-general'>
              <div className='card-header'>
                <div className='vb__utils__heading'><strong>@{model} ({name || macAddress})</strong>
                  <div className='text-muted font-size-15'>{devices.length} thiết bị</div>
                </div>
                <Tabs activeKey={tabKey} className='mr-auto kit-tabs-bold' onChange={changeTab}>
                  <TabPane tab='Hệ thống' key='1' />
                  <TabPane tab='Trạng thái' key='2' />
                  <TabPane tab='Cấu hình' key='3' />
                  <TabPane tab='Lịch sử hoạt động' key='4' />
                </Tabs>
              </div>
              <div className='card-body'>
                {tabKey === '2' && (
                  <div>
                    <ChartPage />
                  </div>
                )}
                {tabKey !== '1' && (
                  <div>Chưa phát hành</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className='modal-small'
        title={<div><i className='i_warning ico-white25' /><span>Thông báo</span></div>}
        visible={showmodal}
        onCancel={() => setShowmodal(false)}
        width={400}
        footer={[
          <Button
            key='submit'
            className='btn btn-create btn-save'
            loading={loading}
            onClick={() => onDelete()}
          >
            <i className='i_save_36 ico25' />
            <strong>Xác nhận</strong>
          </Button>,
          <Button
            key='cancel'
            className='btn btn-create btn-cancel'
            loading={loading}
            onClick={() => setShowmodal(false)}
          >
            <i className='i_cancel ico25' />
            <strong>Hủy</strong>
          </Button>
        ]}
      >
        <p>Xác nhận {id ?? 'hủy'} chặn tài khoản <br /> <span className='txt-orange' /> {name}</p>

      </Modal>
    </>
  )
}

export default withRouter(connect(mapStateToProps)(DefaultPage))
