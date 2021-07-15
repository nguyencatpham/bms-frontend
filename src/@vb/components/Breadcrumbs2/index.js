import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduce } from 'lodash'
import { history } from 'index'
import styles from './style.module.scss'
import { Breadcrumb } from 'antd'
import { Fragment } from 'react'

const mapStateToProps = ({ menu }) => ({
  menuData: menu.menuData,
})

const Breadcrumbs2 = (props) => {
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const {
    location: { pathname },
    menuData = [],
  } = props
  useEffect(() => {
    setBreadcrumbs(() => getBreadcrumbs())
  }, [pathname, menuData])
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

  const getBreadcrumbs = () => {
    let [activeMenuItem] = getPath(menuData, pathname)
    const pathUrl = pathname.split('/')

    let title2, title3, href2, href3
    if (pathUrl.length === 2) {
      title2 = activeMenuItem.title
      href2 = pathname
    } else if (pathUrl.length === 3) {
      title3 = pathUrl[2] === 'create' ? 'Tạo mới' : ''
      href3 = pathname
      const item = menuData.find((d) => d.url.includes(pathUrl[1]))
      title2 = item.title
      href2 = '/' + pathUrl[1]
    } else if (pathUrl.length === 4) {
      title3 = pathUrl[3] === 'update' ? 'Chỉnh sửa' : ''
      href3 = pathname
      const item = menuData.find((d) => d.url.includes(pathUrl[1]))
      title2 = item.title
      href2 = '/' + pathUrl[1]
    }

    if (pathUrl.length > 1) {
      return pathUrl.map((x, index) => {
        const items = []
        if (index === 0) {
          return null
        }

        if (index === 1) {
          if (pathUrl.includes('dashboard')) {
            return null
          }
          const item = (
            <Breadcrumb.Item>
              <Link to={href2}>{title2.toUpperCase()}</Link>
            </Breadcrumb.Item>
          )
          items.push(item)
        }

        if (index === 2) {
          const item = (
            <Breadcrumb.Item>
              <Link to={href3}>{title3.toUpperCase()}</Link>
            </Breadcrumb.Item>
          )
          items.push(item)
        }
        return items
      })
    }
    return (
      <Breadcrumb.Item>
        <Link to={pathname}>{activeMenuItem.title}</Link>
      </Breadcrumb.Item>
    )
  }

  const isDashboard = () => {
    const pathUrl = pathname.split('/')
    return !pathUrl.includes('dashboard')
  }

  const isCreatable = () => {
    const current = window.location.pathname
    if (current.split('/').length !== 2) {
      return false
    }
    if (
      current === '/' ||
      current === '/dashboard' ||
      current.includes('create') ||
      current.includes('update') ||
      current.includes('detail') ||
      current.includes('events')
    ) {
      return false
    }
    return true
  }
  return (
    <div className={styles.subbar}>
      <ul className={`${styles.breadcrumbs} mr-4`}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/dashboard">TRANG CHỦ</Link>
          </Breadcrumb.Item>
          {breadcrumbs}
        </Breadcrumb>
      </ul>
      <div className={`${styles.divider} mr-4 d-none d-xl-block`} />
      {isCreatable() && (
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
      )}
      {isDashboard() && (
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
      )}
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(Breadcrumbs2))
