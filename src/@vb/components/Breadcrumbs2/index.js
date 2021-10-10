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
    {/* <Menu.Item key="0">
      <a href="https://www.antgroup.com">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="https://www.aliyun.com">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider /> */}
    <Menu.Item key="3">
      <Link to="/logout" style={{ textDecoration: 'none' }}>
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

  // const getPath = (data, url, parents = []) => {
  //   const items = reduce(
  //     data,
  //     (result, entry) => {
  //       if (result.length) {
  //         return result
  //       }
  //       if (entry.url === url) {
  //         return [entry].concat(parents)
  //       }
  //       if (entry.children) {
  //         const nested = getPath(entry.children, url, [entry].concat(parents))
  //         return (result || []).concat(nested.filter((e) => !!e))
  //       }
  //       return result
  //     },
  //     [],
  //   )
  //   return items.length > 0 ? items : [false]
  // }

  const getBreadcrumb = (urlPath) => {
    console.log(urlPath)
    const paths = urlPath.split('/')
    const [_, first, second, third] = paths
    const firstMenu = menuData.find((i) => i.url.includes(first))
    if (!firstMenu) return undefined;
    const firstPart = firstMenu.title
    if (second) {
      console.log('there is another')
    }

    return firstPart;
  }

  const breadcrumb = getBreadcrumb(pathname)

  return (
    <div className="Breadcrumb">
      <div className="group-titles">
        <div className="title">{breadcrumb}</div>
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
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(Breadcrumbs2))
