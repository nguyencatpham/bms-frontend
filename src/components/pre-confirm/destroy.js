
import React from 'react'
import { Modal, Button } from 'antd'

const DefaultPage = ({ type, value, visible, onOk, onCancel }) => {
  return (
    <>
      <Modal
        className='modal-small'
        title={<div><i className='i_warning ico-white25' /><span>Thông báo</span></div>}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        width={400}
        footer={[
          <Button
            htmlType='submit'
            key='back'
            onClick={onCancel}
            className='btn btn-grey'
          >
              Hủy
          </Button>,
          <Button
            htmlType='submit'
            key='submit'
            className='btn btn-delete'
            onClick={onOk}
          >
              Xóa
          </Button>
        ]}
      >
        <p>Xác nhận xóa {type} <br /> <span className='txt-orange'>{value}</span> </p>
      </Modal>
    </>
  )
}

export default DefaultPage
