import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Button, Modal, Input, Form, Tabs } from 'antd'
import { connect } from 'react-redux'
import { withRouter, useParams } from 'react-router-dom'
import { history } from 'index'
import General from 'components/kit/widgets/General/10v1'
import General1 from 'components/kit/widgets/General/1'
import General12v1 from 'components/kit/widgets/General/12v1'
import List19 from 'components/kit/widgets/Lists/19'
import DevicePage from './auth-device'
import '../style.scss'

const { Item } = Form
const { TabPane } = Tabs

const mapStateToProps = ({ account, dispatch }) => {
  const { loading, detail } = account

  return { loading, detail, dispatch }
}

const DefaultPage = ({ loading, detail, dispatch }) => {
  const { id } = useParams()
  const [form] = Form.useForm()
  const { name, role, suspend, description, phoneNumber, address, email, username, devices = [] } = detail
  const [showmodal, setShowmodal] = useState()
  const [tabKey, setTabKey] = useState('1')
  const onDelete = (suspend) => {
    dispatch({
      type: 'account/BAN',
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
      type: 'account/SET_PASSWORD',
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
      type: 'account/DETAIL',
      payload: { id, filter: JSON.stringify({ include: [{ relation: 'devices' }] }) }
    })
  }, [id, dispatch])
  const actions = [{
    id: '__suspend',
    name: suspend ? 'Hủy chặn tài khoản' : 'Chặn tài khoản',
    color: suspend ? '#fa8c16' : '#f5222d',
    action: () => { setShowmodal(true) }
  },
  {
    id: '__attach_device',
    name: 'Thêm thiết bị',
    action: () => { history.push(`${window.location.pathname}/attach`) }
  }]
  return (
    <>
      <div className='detail-page account'>
        <Helmet title='Thông tin tài khoản' />
        {/* <h3 className='form-title'><i className='i_user_8 ico30' />QUẢN LÝ TÀI KHOẢN</h3> */}
        <div className='row'>
          <div className='col-xl-4 col-lg-12'>
            <div className='card profile-general'>
              <div className='card-body'>
                <General
                  name={name || email || username}
                  role={role}
                  actions={actions}
                />
              </div>
            </div>
            <div className='card text-white bg-primary'>
              <General12v1 />
            </div>
            <div className='card'>
              <div className='card-body'>
                <General1
                  phone={phoneNumber}
                  address={address}
                  description={description}
                />
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
                <div className='vb__utils__heading'><strong>@{username} ({name || email})</strong>
                  <div className='text-muted font-size-15'>{devices.length} thiết bị</div>
                </div>
                <Tabs activeKey={tabKey} className='mr-auto kit-tabs-bold' onChange={changeTab}>
                  <TabPane tab='Hệ thống' key='1' />
                  <TabPane tab='Cập nhật thông tin' key='2' />
                  <TabPane tab='Thay đổi mật khẩu' key='3' />
                  <TabPane tab='Lịch sử hoạt động' key='4' />
                </Tabs>
              </div>
              <div className='card-body'>
                {tabKey === '1' && (
                  <div>
                    <DevicePage />
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
            onClick={() => onDelete(!suspend)}
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
        <p>Xác nhận {suspend ?? 'hủy'} chặn tài khoản <br /> <span className='txt-orange' /> {name}</p>

      </Modal>
    </>
  )
}

export default withRouter(connect(mapStateToProps)(DefaultPage))
