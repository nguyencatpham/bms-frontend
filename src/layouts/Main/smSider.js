import React, { useState } from 'react'
import { Drawer, Button, Space, Radio } from 'antd'
import SiderContent from './siderContent'
import MenuIcon from '@ant-design/icons/MenuOutlined'

const SmSider = () => {
  const [visible, setVisible] = useState(false)
  const [placement, setPlacement] = useState('right')

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  return (
    <div className="SmSider">
      <Button className="toggle-btn" onClick={showDrawer}>
        <MenuIcon />
      </Button>
      <Drawer
        className='Drawer'
        title={null}
        placement={'left'}
        width={255}
        onClose={onClose}
        visible={visible}
        
      >
        <SiderContent />
      </Drawer>
    </div>
  )
}

export default SmSider
