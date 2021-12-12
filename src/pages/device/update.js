import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { withRouter, useParams } from 'react-router-dom'
import { Form, Input, Button, Card, Select } from 'antd'
import PreConfirm from 'components/pre-confirm'
import { history } from 'index'
import { ROLE } from 'constant'
import './detailForm.scss'

const { Item } = Form
const { TextArea } = Input
const { Option } = Select

const mapStateToProps = ({ device, dispatch }) => {
  const { loading, detail, preConfirm } = device

  return { loading, detail, preConfirm, dispatch }
}
const DefaultPage = ({ loading, detail, preConfirm, dispatch }) => {
  const [form] = Form.useForm()
  const { id } = useParams()
  const [modal, setModal] = useState(false)
  const { name, role, address, description, username } = detail

  const onFinish = (body) => {
    delete body.zoneId
    delete body.role
    dispatch({
      type: 'device/UPDATE',
      payload: {
        id,
        body
      }
    })
  }

  const validateFields = async () => {
    form.setFieldsValue({ password: '' })
    dispatch({
      type: 'device/FLUSH_PRE_CONFIRM',
      payload: {}
    })
    try {
      await form.validateFields(['name', 'description', 'description'])
      setModal(true)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    dispatch({
      type: 'device/FLUSH_PRE_CONFIRM',
      payload: {}
    })
  }, [dispatch])
  useEffect(() => {
    dispatch({
      type: 'device/DETAIL',
      payload: { id, filter: JSON.stringify({ include: [{ relation: 'devices' }] }) }
    })
  }, [dispatch, id])

  useEffect(() => {
    form.setFieldsValue({
      name,
      address,
      role,
      description,
      username
    })
  }, [detail, form, name, address, role, description, username])

  return (
    <>
      <div className='DevicePage page'>
        <Helmet title='Thiết bị | Cập nhật' />
        <h3 className='form-title'><i className='i_user_8 ico30' />QUẢN LÝ THIẾT BỊ</h3>
        <Form
          className='detail-form'
          onFinish={onFinish}
          form={form}
          autoComplete='off'
        >
          <Item
            className='display-grid grid-row'
            name='name'
            label='name'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập name!'
              }
            ]}
          >
            <Input placeholder='Nhập UUID' />
          </Item>
          <Item
            className='display-grid grid-row'
            name='macAddress'
            label='Địa chỉ Mac'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập địa chỉ mac address!'
              }
            ]}
          >
            <Input placeholder='Nhập địa chỉ MAC...' />
          </Item>
          <Item
            className='display-grid grid-row'
            name='serialId'
            label='Serial'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập Serial!'
              }
            ]}
          >
            <Input placeholder='Nhập Serial...' />
          </Item>
          <Item
            className='display-grid grid-row'
            name='model'
            label='Model'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập model!'
              }
            ]}
          >
            <Input placeholder='Nhập model...' />
          </Item>
          <div className='text-right fl-right btn-footer btn-group-footer'>
            <Button type='dashed' onClick={() => history.push('/devices')}>
              <i className='i_cancel ico25' />
              <strong>Hủy</strong>
            </Button>
            <Button
              type='primary'
              style={{ marginLeft: 10 }}
              onClick={() => validateFields()}
            >
              <i className='i_save_36 ico25' />
              <strong>Lưu</strong>
            </Button>
          </div>
          {/* <div className="fl-right btn-group-footer">
                <div className="fl-right">
                  <Button
                    className="btn btn-create btn-cancel"
                    htmlType="button"
                    loading={loading}
                    onClick={() => history.goBack()}
                  >
                    <i className="i_cancel ico25" />
                    <strong>Hủy</strong>
                  </Button>
                  <Button
                    className="btn btn-create btn-save"
                    htmlType="button"
                    loading={loading}
                    onClick={() => validateFields()}
                  >
                    <i className="i_save_36 ico25" />
                    <strong>Lưu</strong>
                  </Button>
                </div>
              </div> */}
          <PreConfirm
            loading={loading}
            visible={modal}
            onOk={() => form.submit()}
            onCancel={() => setModal(false)}
            preConfirm={preConfirm}
          />
        </Form>
      </div>
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
