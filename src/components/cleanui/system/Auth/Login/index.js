import React from 'react'
import { connect } from 'react-redux'
import { Input, Button, Radio, Form, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import style from '../style.module.scss'

const mapStateToProps = ({ user, settings, dispatch }) => ({
  dispatch,
  user,
  authProvider: settings.authProvider,
  logo: settings.logo
})

const Login = ({ dispatch, user, authProvider, logo }) => {
  const onFinish = values => {
    dispatch({
      type: 'user/LOGIN',
      payload: values
    })
  }

  const onFinishFailed = errorInfo => {
    console.info('Failed:', errorInfo)
  }

  const changeAuthProvider = value => {
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'authProvider',
        value
      }
    })
  }

  return (
    <div>
      <div className='text-center mb-5'>
        <h1 className='mb-5 px-3'>
          <strong>Hệ thống quản lý ắc quy</strong>
        </h1>
      </div>
      <div className={`card ${style.container}`}>
        <div className='text-dark font-size-24 mb-3'>
          <strong>Đăng nhập vào hệ thống</strong>
        </div>
        <div className='mb-4'>
          <Radio.Group style={{ display: 'none' }} onChange={e => changeAuthProvider(e.target.value)} value='jwt'>
          </Radio.Group>
        </div>
        <Form
          layout='vertical'
          hideRequiredMark
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className='mb-4'
          initialValues={{ username: 'admin', password: '12345612' }}
        >
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản' }]}
          >
            <Input size='large' placeholder='Tài khoản' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input size='large' type='password' placeholder='Mật khẩu' />
          </Form.Item>
          <Button
            type='primary'
            size='large'
            className='text-center w-100'
            htmlType='submit'
            loading={user.loading}
          >
            <strong>Đăng nhập</strong>
          </Button>
        </Form>
        <Link to='/auth/forgot-password' className='kit__utils__link font-size-16'>
          Quên mật khẩu?
        </Link>
      </div>
      <div className='text-center pt-2 mb-auto'>
        <span className='mr-2'>Bạn chưa có tài khoản?</span>
        <Link to='/auth/register' className='kit__utils__link font-size-16'>
          Đăng ký
        </Link>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Login)
