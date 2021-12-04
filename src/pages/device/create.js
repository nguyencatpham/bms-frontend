import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { withRouter, useHistory } from 'react-router-dom'
import { Form, Input, Button, Card } from 'antd'
import './detailForm.scss'

const { Item } = Form

const mapStateToProps = ({ device, user, dispatch }) => {
  const { loading, detail } = device
  const { role, id: userId } = user
  return { loading, detail, role, userId, dispatch }
}
const DefaultPage = ({ userId, dispatch }) => {
  const history = useHistory();
  const [form] = Form.useForm()
  const onFinish = values => {
    delete values.role
    delete values.confirm
    dispatch({
      type: 'authDevice/CREATE',
      payload: { body: [{ ...values }] }
    })
  }

  return (
    <>
      <div className='detail-page device-create-page'>
        <Helmet title='Thiết bị | Tạo mới' />
        {/* <h3 className='form-title'><i className='i_user_8 ico30' />QUẢN LÝ THIẾT BỊ</h3> */}
        <div className='card-content'>
          <div className='card-bg detail-form-wrap'>
            {/* <Card title='Thêm thiết bị'> */}
              <Form
                className='detail-form'
                onFinish={onFinish}
                form={form}
              >
                {/* <div className='row'>
                  <div className='col-lg-8 col-md-8 offset-md-2'> */}
                    <Item
                      className='display-grid grid-row'
                      name='uuid'
                      label='UUID'
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập UUID!'
                        }, {
                          max: 256,
                          message: 'UUID quá dài!'
                        }
                      ]}
                    >
                      <Input
                        placeholder='Nhập UUID'
                      />
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
                      <Input
                        placeholder='Nhập địa chỉ MAC...'
                      />
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
                      <Input
                        placeholder='Nhập Serial...'
                      />
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
                      <Input
                        placeholder='Nhập model...'
                      />
                    </Item>
                    <div className='text-right fl-right btn-footer btn-group-footer'>
                      <Button
                        type='dashed'
                        onClick={() => history.push('/devices')}
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
                  {/* </div>
                </div> */}
              </Form>
            {/* </Card> */}
          </div>
        </div>
      </div>
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
