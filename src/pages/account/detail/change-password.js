import React from 'react'
import { connect } from 'react-redux'
import { Input, Button, Form } from 'antd'
import { Link } from 'react-router-dom'
import style from '../style.scss'

const mapStateToProps = ({ user, settings, dispatch, account }) => ({
  dispatch,
  user,
  authProvider: settings.authProvider,
  logo: settings.logo,
  version: settings.version,
  accountDetail: account.detail,
})

const ChangePassword = ({ dispatch, user, logo, version, accountDetail }) => {
  const onFinish = (values) => {
    const { password } = values
    dispatch({
      type: 'account/SET_PASSWORD',
      payload: { id: accountDetail.id, password },
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <Form
        layout="vertical"
        hideRequiredMark
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="mb-4"
      >
        <Form.Item
          className=""
          name="password"
          label="Mật khẩu mới"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu!',
            },
          ]}
        >
          <Input.Password placeholder="******" visibilityToggle />
        </Form.Item>
        <Form.Item
          className=""
          name="confirm"
          label="Nhập lại mật khẩu"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập lại mật khẩu!',
            },
            ({ getFieldValue }) => ({
              validator(value) {
                if (!value || getFieldValue('password') === getFieldValue('confirm')) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Mật khẩu không khớp!'))
              },
            }),
          ]}
        >
          <Input.Password placeholder="******" visibilityToggle />
        </Form.Item>
        <div className="text-right fl-right btn-footer btn-group-footer">
          <Button type="primary" style={{ marginLeft: 10 }} htmlType="submit">
            <i className="i_save_36 ico25" />
            <strong>Cập nhật</strong>
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default connect(mapStateToProps)(ChangePassword)
