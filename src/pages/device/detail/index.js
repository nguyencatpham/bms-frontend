import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Button, Modal, Table, Tabs } from 'antd'
import { connect } from 'react-redux'
import { withRouter, useParams } from 'react-router-dom'
import { get } from 'lodash'
import { TIME_FORMAT } from 'constant'

import General from 'components/kit/widgets/General/10v1'
import TotalBlock from 'components/kit/widgets/General/totalBlock'
import moment from 'moment'
import SystemPage from './system'
import SettingPage from './setting'
import HistoryPage from './history'
import AlertPage from './alert'
import '../style.scss'
import config from 'config/config'

const { TabPane } = Tabs

const mapStateToProps = ({ authDevice, system: sys, dispatch }) => {
  const { loading, detail } = authDevice
  const device = get(detail.devices, ['0'], {})
  const system = get(device.systems, ['0'], {})
  const { blocks = [] } = sys
  return { loading, detail, device, system, blocks, dispatch }
}

const DefaultPage = ({ loading, detail, system, blocks, dispatch }) => {
  const { id } = useParams()
  const { macAddress, uuid, model, updated, devices = [] } = detail
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
                relation: 'systems'
              }]
            }
          }]
        })
      }
    })
  }, [id, dispatch])

  const actions = [{
    id: '__remove',
    name: 'Gỡ thiết bị',
    color: config.COLOR.alert,
    action: () => { setShowmodal(true) }
  }]
  const _system = JSON.parse(JSON.stringify(system))
  delete _system.blocks
  delete _system.id
  delete _system.deviceId
  delete _system.systemId
  delete _system.userId
  delete _system.created
  delete _system.error
  delete _system.block
  delete _system.unit
  delete _system.enable
  delete _system.address16
  delete _system.address24
  delete _system.address32
  delete _system.address40
  delete _system.internetAvailable
  delete _system.wifiSignal
  delete _system.ssid
  delete _system.mobileSignal

  const supportCasesTableData = Object.keys(_system).map((value, index) => ({
    key: `${index}`,
    type: value,
    amount: system[value] || '-'
  }))
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
      render: (amount, item) => {
        if (amount === 'Negative') {
          return <span className='text-capital text-danger font-weight-bold'>{amount}</span>
        }
        if (item.type === 'created' || item.type === 'updated') {
          return <span className='text-capital text-primary font-weight-bold'>{amount ? moment(amount).format(TIME_FORMAT) : '---'}</span>
        }
        return <span className='text-capital text-primary font-weight-bold'>{amount}</span>
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
                  avatar='/resources/images/battery-icon.png'
                  name={name || macAddress || uuid}
                  role={updated}
                  actions={actions}
                  width={100}
                />
              </div>
            </div>
            <div className='card text-white bg-primary'>
              <TotalBlock
                online={blocks.length}
                total={blocks.length}
              />
            </div>
            {/* <div className='card'>
              <div className='card-header border-0 pb-0'>
                <div className='cui__utils__heading mb-0'>
                  <strong className='text-uppercase font-size-16'>Thông số cấu hình</strong>
                </div>
              </div>
              <div className='card-body'>
                <div className='mb-3'>
                  <Table
                    className='text-capital'
                    dataSource={supportCasesTableData}
                    columns={supportCasesTableColumns}
                    pagination={false}
                  />
                </div>
              </div>
            </div> */}
          </div>
          <div className='col-xl-8 col-lg-12'>
            <div className='card profile-general'>
              <div className='card-header'>
                <div className='vb__utils__heading'><strong>@{model} ({name || macAddress})</strong>
                  <div className='text-muted font-size-15'>{devices.length} thiết bị</div>
                </div>
                <Tabs activeKey={tabKey} className='mr-auto kit-tabs-bold' onChange={changeTab}>
                  <TabPane tab='Hệ thống' key='1' />
                  <TabPane tab='Cấu hình' key='2' />
                  <TabPane tab='Cảnh báo' key='3' />
                  <TabPane tab='Lịch sử hoạt động' key='4' />
                </Tabs>
              </div>
              <div className='card-body'>
                {tabKey === '1' && (
                  <SystemPage />
                )}
                {tabKey === '2' && (
                  <SettingPage />
                )}
                {tabKey === '3' && (
                  <AlertPage />
                )}
                {tabKey === '4' && (
                  <HistoryPage />
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
