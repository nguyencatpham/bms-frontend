import React, { useState } from 'react'
import { Drawer, Button, Space, Radio } from 'antd'
import SiderContent from './siderContent'
import MenuIcon from '@ant-design/icons/MenuOutlined'

const SmSider = (props) => {
  // const [visible, setVisible] = useState(false)
  // const [placement, setPlacement] = useState('right')

  // const showDrawer = () => {
  //   setVisible(true)
  // }

  // const onClose = () => {
  //   setVisible(false)
  // }

  return (
    <div className="SmSider">
      <Drawer
        className="Drawer"
        title={null}
        placement={'left'}
        width={255}
        onClose={() => props.setMobileSidebarVisible(false)}
        visible={props.visible}
      >
        <SiderContent />
      </Drawer>
    </div>
  )
}

export default SmSider
