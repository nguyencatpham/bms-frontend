import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button, Card, Select } from 'antd'
import { history } from 'index'
import { ROLE } from 'constant'
import './detailForm.scss'

const { Item } = Form
const { TextArea } = Input
const { Option } = Select

const mapStateToProps = ({ account, user, dispatch }) => {
  const { loading, detail } = account
  const { role } = user
  return { loading, detail, role, dispatch }
}
const DefaultPage = ({ loading, detail, role, dispatch }) => {
  const [form] = Form.useForm()
  const onFinish = values => {
    delete values.role
    delete values.confirm
    dispatch({
      type: 'account/CREATE',
      payload: { body: { ...values } }
    })
  }
  return (
    <>
      <div className='detail-page account-create-page'>
        <Helmet title='Tài khoản | Tạo mới' />
        <h3 className='form-title'><i className='i_user_8 ico30' />QUẢN TRỊ VIÊN</h3>
        <div className='card-content'>
          <div className='card-bg detail-form-wrap'>
            {/* <Card title='Thêm tài khoản'> */}
            <Form
              className='detail-form'
              onFinish={onFinish}
              form={form}
            >
              <div className='row'>
                <div className='col-lg-8 col-md-8 offset-md-2'>
                  <Item
                    className='display-grid grid-row'
                    name='name'
                    label='Họ tên'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập tên!'
                      }, {
                        max: 256,
                        message: 'Tên quá dài!'
                      }
                    ]}
                  >
                    <Input
                      placeholder='Nhập họ tên...'
                    />
                  </Item>
                  <Item
                    className='display-grid grid-row'
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
                  <Item
                    className='display-grid grid-row'
                    name='password'
                    label='Mật khẩu'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu!'
                      }
                    ]}
                  >
                    <Input.Password
                      placeholder='******'
                      visibilityToggle
                    />
                  </Item>
                  <Item
                    className='display-grid grid-row'
                    name='confirm'
                    label='Nhập lại mật khẩu'
                    dependencies={['password']}
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập lại mật khẩu!'
                      },
                      ({ getFieldValue }) => ({
                        validator (value) {
                          if (!value || getFieldValue('password') === getFieldValue('confirm')) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error('Mật khẩu không khớp!'))
                        }
                      })
                    ]}
                  >
                    <Input.Password
                      placeholder='******'
                      visibilityToggle
                    />
                  </Item>
                  <div className='text-right fl-right btn-footer btn-group-footer'>
                    <Button
                      type='dashed'
                      onClick={() => history.push('/accounts')}
                    >
                      <i className='i_cancel ico25' />
                      <strong>Hủy</strong>
                    </Button>
                    <Button
                      type='primary'
                      style={{ marginLeft: 10 }}
                      htmlType='submit'
                    >
                      <i className='i_save_36 ico25' />
                      <strong>Lưu</strong>
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
            {/* </Card> */}
          </div>
        </div>
      </div>
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
