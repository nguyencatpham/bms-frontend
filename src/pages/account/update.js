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

const mapStateToProps = ({ account, dispatch }) => {
  const { loading, detail, preConfirm } = account

  return { loading, detail, preConfirm, dispatch }
}
const DefaultPage = ({ loading, detail, preConfirm, dispatch }) => {
  const [form] = Form.useForm()
  const { id } = useParams()
  const [modal, setModal] = useState(false)
  const { name, role, address, description, username } = detail

  const onFinish = body => {
    delete body.role
    if (!body.passphrase) {
      delete body.passphrase
    }
    console.log({ body })
    dispatch({
      type: 'account/UPDATE',
      payload: {
        id,
        body
      }
    })
  }

  const validateFields = async () => {
    form.setFieldsValue({ password: '', passphrase: '' })
    dispatch({
      type: 'account/FLUSH_PRE_CONFIRM',
      payload: {}
    })
    try {
      await form.validateFields(['name', 'description'])
      setModal(true)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    dispatch({
      type: 'account/FLUSH_PRE_CONFIRM',
      payload: {}
    })
  }, [dispatch])
  useEffect(() => {
    dispatch({
      type: 'account/DETAIL',
      payload: { id, filter: JSON.stringify({ include: [{ relation: 'devices' }] }) }
    })
  }, [dispatch, id])

  useEffect(() => {
    form.setFieldsValue({
      name,
      address,
      role: ROLE[role] === ROLE.admin ? ROLE.manager : ROLE.operator,
      description,
      username
    })
  }, [detail, form, name, address, role, description, username])

  return (
    <>
      <div className='detail-page account-update-page'>
        <Helmet title='T??i kho???n | C???p nh???t' />
        {/* <h3 className='form-title'><i className='i_user_8 ico30' />QU???N TR??? VI??N</h3> */}
        <div className='card-content'>
          <div className='card-bg detail-form-wrap'>
            {/* <Card title={<p><span>C???p nh???t t??i kho???n:</span><span className='txt-orange'>{name}</span></p>}> */}
            <Form
              className='detail-form'
              onFinish={onFinish}
              form={form}
              autoComplete='off'
            >
              {/* <div className='row'>
                  <div className='col-lg-8 col-md-8 offset-md-2'> */}
              <Item
                className='display-grid fullname'
                name='name'
                label='H??? t??n'
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p H??? t??n!'
                  }, {
                    max: 256,
                    message: 'H??? t??n qu?? d??i!'
                  }
                ]}
              >
                <Input
                  placeholder='Nh???p h??? t??n...'
                />
              </Item>
              <Item
                className='display-grid address'
                name='address'
                label='?????a ch???'
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p ?????a ch???!'
                  }
                ]}
              >
                <Input
                  placeholder='Nh???p ?????a ch???...'
                />
              </Item>
              <Item
                className='display-grid grid-row username'
                name='username'
                label='T??n ????ng nh???p'
                rules={[
                  {
                    required: false,
                    message: 'Vui l??ng nh???p t??n ????ng nh???p!'
                  }, {
                    max: 255,
                    message: 'T??n ????ng nh???p qu?? d??i!'
                  }
                ]}
              >
                <Input disabled />
              </Item>
              <Item
                className='display-grid grid-row password'
                name='passphrase'
                label='M???t kh???u'
                rules={[{
                  max: 32,
                  message: 'M???t kh???u qu?? d??i!'
                }
                ]}
              >
                <Input type='password' />
              </Item>
              <Item
                className='display-grid grid-row role'
                name='role'
                label='Vai tr??'
              >
                <Input disabled />
              </Item>
              <Item
                className='display-grid grid-row note'
                name='description'
                label='Ghi ch??'
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p ghi ch??!'
                  },
                  {
                    message: 'ghi ch?? qu?? d??i!',
                    max: 512
                  }
                ]}
              >
                <TextArea
                  placeholder='Nh???p ghi ch??...'
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Item>
              <div className='text-right fl-right btn-footer btn-group-footer'>
                <Button
                  type='dashed'
                  onClick={() => history.push('/accounts')}
                >
                  <i className='i_cancel ico25' />
                  <strong>H???y</strong>
                </Button>
                <Button
                  type='primary'
                  style={{ marginLeft: 10 }}
                  onClick={() => setModal(true)}
                >
                  <i className='i_save_36 ico25' />
                  <strong>L??u</strong>
                </Button>
              </div>
              {/* <div className='fl-right btn-group-footer'>
                      <div className='fl-right'>
                        <Button
                          className='btn btn-create btn-cancel'
                          htmlType='button'
                          loading={loading}
                          onClick={() => history.goBack()}
                        >
                          <i className='i_cancel ico25' />
                          <strong>H???y</strong>
                        </Button>
                        <Button
                          className='btn btn-create btn-save'
                          htmlType='button'
                          loading={loading}
                          onClick={() => validateFields()}
                        >
                          <i className='i_save_36 ico25' />
                          <strong>L??u</strong>
                        </Button>
                      </div> */}
              {/* </div>
                  </div> */}
              {/* </div> */}
              <PreConfirm
                loading={loading}
                visible={modal}
                onOk={() => form.submit()}
                onCancel={() => setModal(false)}
                preConfirm={preConfirm}
              />
            </Form>
            {/* </Card> */}
          </div>
        </div>
      </div>
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
