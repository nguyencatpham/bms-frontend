import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { withRouter, useParams } from 'react-router-dom'
import { Form, Input, Button, Card, Select } from 'antd'
import PreConfirm from 'components/pre-confirm'
import { history } from 'index'
import { ROLE } from 'constant'
import './style.scss'

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

  const onFinish = body => {
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
      console.log(error)
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
      <div className='detail-page device-create-page'>
        <Helmet title='Tài khoản | Cập nhật' />
        <h3 className='form-title'><i className='i_user_8 ico30' />QUẢN LÝ TÀI KHOẢN</h3>
        <div className='card-content'>
          <div className='card-bg'>
            <Card title={<p><span>Cập nhật tài khoản:</span><span className='txt-orange'>{name}</span></p>}>
              <Form
                className='detail-form'
                onFinish={onFinish}
                form={form}
                autoComplete='off'
              >
                <div className='row'>
                  <div className='col-lg-8 col-md-8 offset-md-2'>
                    <Item
                      className='display-grid'
                      name='name'
                      label='Họ tên'
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập Họ tên!'
                        }, {
                          max: 256,
                          message: 'Họ tên quá dài!'
                        }
                      ]}
                    >
                      <Input
                        placeholder='Nhập họ tên...'
                      />
                    </Item>
                    <Item
                      className='display-grid'
                      name='address'
                      label='Địa chỉ'
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập địa chỉ!'
                        }
                      ]}
                    >
                      <Input
                        placeholder='Nhập địa chỉ...'
                      />
                    </Item>
                    <Item
                      className='display-grid grid-row'
                      name='role'
                      label='Vai trò'
                      initialValue={
                        ROLE[role] === ROLE.admin ? ROLE.client : ROLE.user
                      }
                    >
                      <Select
                        disabled options={Object.keys(ROLE).map(x => (
                          <Option key={x} value={x}>{ROLE[x]}</Option>
                        ))}
                      />
                    </Item>
                    <Item
                      className='display-grid grid-row'
                      name='description'
                      label='Ghi chú'
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập ghi chú!'
                        },
                        {
                          message: 'ghi chú quá dài!',
                          max: 512
                        }
                      ]}
                    >
                      <TextArea
                        placeholder='Nhập ghi chú...'
                        autoSize={{ minRows: 3, maxRows: 5 }}
                      />
                    </Item>
                    <Item
                      className='display-grid grid-row'
                      name='username'
                      label='Tên đăng nhập'
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập tên đăng nhập!'
                        }, {
                          max: 255,
                          message: 'Tên đăng nhập quá dài!'
                        }
                      ]}
                    >
                      <Input />
                    </Item>
                    <div className='fl-right btn-group-footer'>
                      <div className='fl-right'>
                        <Button
                          className='btn btn-create btn-cancel'
                          htmlType='button'
                          loading={loading}
                          onClick={() => history.goBack()}
                        >
                          <i className='i_cancel ico25' />
                          <strong>Hủy</strong>
                        </Button>
                        <Button
                          className='btn btn-create btn-save'
                          htmlType='button'
                          loading={loading}
                          onClick={() => validateFields()}
                        >
                          <i className='i_save_36 ico25' />
                          <strong>Lưu</strong>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <PreConfirm
                  loading={loading}
                  visible={modal}
                  onOk={() => form.submit()}
                  onCancel={() => setModal(false)}
                  preConfirm={preConfirm}
                />
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))