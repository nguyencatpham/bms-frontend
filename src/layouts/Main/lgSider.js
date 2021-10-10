import React from 'react'
import SiderContent from './siderContent'
import { Layout } from 'antd'
import style from './style.module.scss'

export default function LgSider() {
  return (
    <Layout.Sider className="LgSider">
      <a href="#" className={style.air__menuLeft__toggleButton}
      //  onClick={toggleMenu}
       >
            <span />
            <span />
          </a>
      <SiderContent />
    </Layout.Sider>
  )
}
