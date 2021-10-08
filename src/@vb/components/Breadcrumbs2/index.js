import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduce } from 'lodash'
import { history } from 'index'
import styles from './style.module.scss'
import { Breadcrumb, Avatar, Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import './style.scss'

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="https://www.antgroup.com">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="https://www.aliyun.com">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">
      <Link
        // style={{ padding: '1.1rem 1rem', fontSize: '1.2rem' }}
        to="/logout"
        // className={style.air__menuLeft__link}
      >
        {/* {icon && <i className={`${icon} ${style.air__menuLeft__icon}`} />} */}
        <span>Log out</span>
      </Link>
    </Menu.Item>
  </Menu>
)

const mapStateToProps = ({ menu }) => ({
  menuData: menu.menuData,
})

const Breadcrumbs2 = (props) => {
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const {
    location: { pathname },
    menuData = [],
  } = props

  // useEffect(() => {
  //   setBreadcrumbs(() => getBreadcrumbs())
  // }, [pathname, menuData])

  const getPath = (data, url, parents = []) => {
    const items = reduce(
      data,
      (result, entry) => {
        if (result.length) {
          return result
        }
        if (entry.url === url) {
          return [entry].concat(parents)
        }
        if (entry.children) {
          const nested = getPath(entry.children, url, [entry].concat(parents))
          return (result || []).concat(nested.filter((e) => !!e))
        }
        return result
      },
      [],
    )
    return items.length > 0 ? items : [false]
  }

  // const getBreadcrumbs = () => {
  //   let [activeMenuItem] = getPath(menuData, pathname)
  //   const pathUrl = pathname.split('/')

  //   let title2, title3, href2, href3
  //   if (pathUrl.length === 2) {
  //     title2 = activeMenuItem.title
  //     href2 = pathname
  //   } else if (pathUrl.length === 3) {
  //     title3 = pathUrl[2] === 'create' ? 'Tạo mới' : ''
  //     href3 = pathname
  //     const item = menuData.find((d) => d.url.includes(pathUrl[1]))
  //     title2 = item.title
  //     href2 = '/' + pathUrl[1]
  //   } else if (pathUrl.length === 4) {
  //     title3 = pathUrl[3] === 'update' ? 'Chỉnh sửa' : ''
  //     href3 = pathname
  //     const item = menuData.find((d) => d.url.includes(pathUrl[1]))
  //     title2 = item.title
  //     href2 = '/' + pathUrl[1]
  //   }

  //   if (pathUrl.length > 1) {
  //     return pathUrl.map((x, index) => {
  //       const items = []
  //       if (index === 0) {
  //         return null
  //       }

  //       if (index === 1) {
  //         if (pathUrl.includes('dashboard')) {
  //           return null
  //         }
  //         const item = (
  //           <Breadcrumb.Item>
  //             <Link style={{ fontSize: '1.5rem' }} to={href2}>
  //               {title2.toUpperCase()}
  //             </Link>
  //           </Breadcrumb.Item>
  //         )
  //         items.push(item)
  //       }

  //       if (index === 2) {
  //         const item = (
  //           <Breadcrumb.Item>
  //             <Link style={{ fontSize: '1.5rem' }} to={href3}>
  //               {title3.toUpperCase()}
  //             </Link>
  //           </Breadcrumb.Item>
  //         )
  //         items.push(item)
  //       }
  //       return items
  //     })
  //   }
    // return (
    //   <Breadcrumb.Item>
    //     <Link style={{ fontSize: '1.5rem' }} to={pathname}>
    //       {activeMenuItem.title}
    //     </Link>
    //   </Breadcrumb.Item>
    // )
  // }

  // const isDashboard = () => {
  //   const pathUrl = pathname.split('/')
  //   return !pathUrl.includes('dashboard')
  // }

  // const isCreatable = () => {
  //   const current = window.location.pathname
  //   if (current.split('/').length !== 2) {
  //     return false
  //   }
  //   if (
  //     current === '/' ||
  //     current === '/dashboard' ||
  //     current.includes('create') ||
  //     current.includes('update') ||
  //     current.includes('detail') ||
  //     current.includes('events')
  //   ) {
  //     return false
  //   }
  //   return true
  // }
  return (
    <div
      className="Breadcrumb"
      style={{
        backgroundColor: '#fff',
        padding: '2rem',
        marginRight: '2rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div className="group-titles">
        <div className="title">TỔNG QUAN</div>
      </div>
      <div className="menu-profile">
        <Avatar
          className="avatar"
          src="https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
          size="large"
        />
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <div className="profile-name" onClick={(e) => e.preventDefault()}>
            Admin <DownOutlined className="arrow" />
          </div>
        </Dropdown>
      </div>
      {/* <ul className={`${styles.breadcrumbs} mr-4`}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link style={{ fontSize: '1.5rem' }} to="/dashboard">
              
            </Link>
          </Breadcrumb.Item>
          {breadcrumbs}
        </Breadcrumb>
      </ul>
      <div className={`${styles.divider} mr-4 d-none d-xl-block`} /> */}
      {/* {isCreatable() && (
        <button
          style={{ marginRight: 10 }}
          onClick={() => {
            history.push(`${window.location.pathname}/create`)
          }}
          type="button"
          className="btn btn-primary btn-with-addon  text-nowrap d-none d-md-block"
        >
          <span className="btn-addon">
            <i className="btn-addon-icon fe fe-plus-circle" />
          </span>
          Thêm mới
        </button>
      )} */}
      {/* {isDashboard() && (
        <button
          onClick={() => {
            history.goBack()
          }}
          type="button"
          className="btn btn-default btn-with-addon mr-auto text-nowrap d-none d-md-block"
        >
          <span className="btn-addon">
            <i className="btn-addon-icon fe fe-plus-circle" />
          </span>
          Trở về
        </button>
      )} */}
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(Breadcrumbs2))
