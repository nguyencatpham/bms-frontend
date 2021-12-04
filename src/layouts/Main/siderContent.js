import { Layout, Menu, Breadcrumb } from 'antd'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'
import style from './style.module.scss'
const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

const mapStateToProps = ({ menu, settings, user }) => ({
  menuData: menu.menuData,
  settings,
  role: user.role,
  user
})

const SiderContent = ({
  dispatch,
  menuData = [],
  location: { pathname },
  settings,
  role,
  user
}) => {
  const [activeItem, setActiveItem] = useState('')

  // useEffect(() => {
  //   setActiveItems()
  // }, [pathname, menuData])

  const toggleMenu = (e) => {
    e.preventDefault()
    const { isMenuCollapsed } = settings
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isMenuCollapsed',
        value: !isMenuCollapsed
      }
    })
  }

  const toggleMobileMenu = (e) => {
    e.preventDefault()
    const { isMobileMenuOpen } = settings
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isMobileMenuOpen',
        value: !isMobileMenuOpen
      }
    })
  }

  return (
    <div className='SiderContent'>
      <div className={style.air__menuLeft__logo}>
        <div className={style.air__menuLeft__logo__letter}>
          <svg
            width='40'
            height='40'
            viewBox='0 0 40 40'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect width='40' height='40' rx='8' fill='#017EFA' />
            <path
              d='M20 10C14.486 10 10 14.486 10 20C10 25.514 14.486 30 20 30C25.514 30 30 25.514 30 20C30 14.486 25.514 10 20 10ZM20 28C15.589 28 12 24.411 12 20C12 15.589 15.589 12 20 12C24.411 12 28 15.589 28 20C28 24.411 24.411 28 20 28Z'
              fill='white'
            />
            <path d='M21 14L15 21H19V26L25 19H21V14Z' fill='white' />
          </svg>
        </div>
        <div>
          <div className={style.air__menuLeft__logo__name}>Bình Sơn</div>
          <div className={style.air__menuLeft__logo__descr}>Hệ thống giám sát ắc quy</div>
        </div>
      </div>
      <Menu
        mode='inline'
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', backgroundColor: 'inherit', border: 'unset' }}
      >
        {menuData.map((item) => {
          const paths = pathname.split('/')
          const first = paths[1]
          const isCurrentPath = item.url.includes(first)
          // console.info(isCurrentPath);
          return (
            <Menu.Item key={item.key} className={isCurrentPath ? 'active-item' : ''}>
              <Link to={item.url}>
                <i className={item.icon + ' inner'} />
                <span className='ml-2 inner'>{item.title}</span>
              </Link>
            </Menu.Item>
          )
        })}
      </Menu>
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(SiderContent))
