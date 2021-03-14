
import React from 'react'
import { Modal, Button, Input, Form } from 'antd'

const { Item } = Form

const DefaultPage = ({ loading, visible, onOk, onCancel }) => {
  return (
    <>
      <Modal
        className='modal-small pre-confirm-modal'
        title={<div><i className='i_warning ico-white25' /><span>Xác nhận mật khẩu</span></div>}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        width={400}
        footer={[
          <Button
            key='cancel'
            className='btn btn-create btn-cancel'
            htmlType='button'
            loading={loading}
            onClick={onCancel}
          >
            <i className='i_cancel ico25' />
            <strong>Hủy</strong>
          </Button>,
          <Button
            key='submit'
            className='btn btn-create btn-save'
            htmlType='button'
            loading={loading}
            onClick={onOk}
          >
            <i className='i_save_36 ico25' />
            <strong>Xác nhận</strong>
          </Button>

        ]}
      >
        <Item
          name='password'
          label='Nhập lại mật khẩu'
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu để xác nhận!' }]}
        >
          <Input.Password />
        </Item>
        {/* {preConfirm && <label className='msg-fail' style={{ color: 'red' }}> Mật khẩu không đúng!</label>} */}
      </Modal>
    </>
  )
}

export default DefaultPage
