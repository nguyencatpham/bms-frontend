import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { find } from 'lodash'
import classNames from 'classnames'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Layout, Avatar } from 'antd'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { UserOutlined } from '@ant-design/icons'
import style from './style.module.scss'
import { ROLE } from 'constant'

const { Sider } = Layout
const mapStateToProps = ({ menu, settings, user }) => ({
  menuData: menu.menuData,
  settings,
  flyoutActive:
    (settings.flyoutMenuType === 'flyout' ||
      settings.flyoutMenuType === 'compact' ||
      settings.isMenuCollapsed) &&
    !settings.isMobileView,
  role: user.role,
  user
})

const flyoutTimers = {}
let flyoutItems = {}

const MenuLeft = ({
  dispatch,
  menuData = [],
  location: { pathname },
  settings,
  flyoutActive,
  role,
  user
}) => {
  const [activeSubmenu, setActiveSubmenu] = useState('')
  const [activeItem, setActiveItem] = useState('')
  const [renderedFlyoutItems, setRenderedFlyoutItems] = useState({})

  useEffect(() => {
    setActiveItems()
  }, [pathname, menuData])

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

  const handleSubmenuClick = (e, key) => {
    e.preventDefault()
    if (flyoutActive) {
      return
    }
    setActiveSubmenu(activeSubmenu === key ? '' : key)
  }

  const handleFlyoutOver = (event, key, items) => {
    if (flyoutActive) {
      clearInterval(flyoutTimers[key])
      const item = event.currentTarget
      const itemDimensions = item.getBoundingClientRect()
      const element = renderFlyoutMenu(items, key, itemDimensions)
      setRenderedFlyoutItems({
        ...renderedFlyoutItems,
        [key]: element
      })
      flyoutItems = {
        ...renderedFlyoutItems,
        [key]: element
      }
    }
  }

  const handleFlyoutOut = (key) => {
    if (flyoutActive) {
      flyoutTimers[key] = setTimeout(() => {
        delete flyoutItems[key]
        setRenderedFlyoutItems({
          ...flyoutItems
        })
      }, 100)
    }
  }

  const handleFlyoutContainerOver = (key) => {
    clearInterval(flyoutTimers[key])
  }

  const renderFlyoutMenu = (items, key, itemDimensions) => {
    const left = `${itemDimensions.left + itemDimensions.width - 10}px`
    const top = `${itemDimensions.top}px`

    return (
      <div
        style={{ left, top }}
        className={classNames(style.air__menuFlyout, {
          [style.air__menuFlyoutLeft]: settings.menuLayoutType === 'left',
          [style.air__menuFlyout__black]: settings.flyoutMenuColor === 'dark',
          [style.air__menuFlyout__white]: settings.flyoutMenuColor === 'white',
          [style.air__menuFlyout__gray]: settings.flyoutMenuColor === 'gray'
        })}
        key={key}
      >
        <ul
          className={style.air__menuLeft__list}
          onMouseEnter={() => handleFlyoutContainerOver(key)}
          onMouseLeave={() => handleFlyoutOut(key)}
        >
          {items.map((item) => {
            if (item.roles && !item.roles.includes(role)) {
              return null
            }
            return (
              <li
                className={classNames(style.air__menuLeft__item, {
                  [style.air__menuLeft__item__active]: activeItem === item.key
                })}
                key={item.key}
              >
                <Link to={item.url} className={style.air__menuLeft__link}>
                  {item.icon && <i className={`${item.icon} ${style.air__menuLeft__icon}`} />}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const setActiveItems = () => {
    if (!menuData.length) {
      return
    }
    const flattenItems = (items, key) =>
      items.reduce((flattenedItems, item) => {
        flattenedItems.push(item)
        if (Array.isArray(item[key])) {
          return flattenedItems.concat(flattenItems(item[key], key))
        }
        return flattenedItems
      }, [])
    const currentItem = find(flattenItems(menuData, 'children'), ['url', pathname]) || {}
    const currentSubmenu = menuData.reduce((key, parent) => {
      if (Array.isArray(parent.children)) {
        parent.children.map((child) => {
          if (child.key === currentItem.key) {
            key = parent
          }
          return ''
        })
      }
      return key
    })
    setActiveItem(currentItem.key)
    setActiveSubmenu(currentSubmenu.key)
  }

  const generateMenuItems = () => {
    const menuItem = (item) => {
      const { key, title, icon, url } = item
      if (item.category) {
        return (
          <li className={style.air__menuLeft__category} key={Math.random()}>
            <span>{title}</span>
          </li>
        )
      }
      return (
        <li
          className={classNames(style.air__menuLeft__item, {
            [style.air__menuLeft__item__active]: activeItem === key
          })}
          key={key}
        >
          {item.url && (
            <Link
              style={{ padding: '1.1rem 1rem', fontSize: '1.2rem' }}
              to={url}
              className={style.air__menuLeft__link}
            >
              {icon && <i className={`${icon} ${style.air__menuLeft__icon}`} />}
              <span>{title}</span>
            </Link>
          )}
          {!item.url && (
            <a href='#' onClick={(e) => e.preventDefault()} className={style.air__menuLeft__link}>
              {icon && <i className={`${icon} ${style.air__menuLeft__icon}`} />}
              <span>{title}</span>
            </a>
          )}
        </li>
      )
    }

    const submenuItem = (item) => {
      return (
        <li
          className={classNames(style.air__menuLeft__item, style.air__menuLeft__submenu, {
            [style.air__menuLeft__submenu__active]: activeSubmenu === item.key
          })}
          key={item.key}
        >
          <a
            href='#'
            className={style.air__menuLeft__link}
            onClick={(e) => handleSubmenuClick(e, item.key)}
            onMouseEnter={(event) => handleFlyoutOver(event, item.key, item.children)}
            onFocus={(event) => handleFlyoutOver(event, item.key, item.children)}
            onMouseLeave={() => handleFlyoutOut(item.key)}
            onBlur={() => handleFlyoutOut(item.key)}
          >
            <i className={`${item.icon} ${style.air__menuLeft__icon}`} />
            <span>{item.title}</span>
            {item.count && (
              <span className='badge text-white bg-blue-light float-right mt-1 px-2'>
                {item.count}
              </span>
            )}
          </a>
          <ul className={style.air__menuLeft__list}>
            {item.children.map((sub) => {
              if (sub.roles && !sub.roles.includes(role)) {
                return null
              }
              // TODO: multilevel menu
              // if (sub.children) {
              //   return submenuItem(sub)
              // }
              return menuItem(sub)
            })}
          </ul>
        </li>
      )
    }

    return menuData.map((item) => {
      if (item.roles && !item.roles.includes(role)) {
        return null
      }
      if (item.children) {
        return submenuItem(item)
      }
      return menuItem(item)
    })
  }

  const items = generateMenuItems()
  const menuWidthStyle = {
    flex: `0 0 ${settings.leftMenuWidth}px`,
    maxWidth: `${settings.leftMenuWidth}px`,
    minWidth: `${settings.leftMenuWidth}px`,
    width: `${settings.leftMenuWidth}px`
  }

  return (
    <Sider width='auto'>
      <TransitionGroup>
        {Object.keys(renderedFlyoutItems).map((item) => {
          return (
            <CSSTransition key={item} timeout={0} classNames='air__menuFlyout__animation'>
              {renderedFlyoutItems[item]}
            </CSSTransition>
          )
        })}
      </TransitionGroup>
      <div
        className={classNames(style.air__menuLeft, {
          [style.air__menuLeft__mobileToggled]: settings.isMobileMenuOpen,
          [style.air__menuLeft__toggled]: settings.isMenuCollapsed,
          [style.air__menuLeft__unfixed]: settings.isMenuUnfixed,
          [style.air__menuLeft__shadow]: settings.isMenuShadow,
          [style.air__menuLeft__flyout]: settings.flyoutMenuType === 'flyout',
          [style.air__menuLeft__compact]: settings.flyoutMenuType === 'compact',
          [style.air__menuLeft__white]: settings.menuColor === 'white',
          [style.air__menuLeft__gray]: settings.menuColor === 'gray',
          [style.air__menuFlyout__black]:
            settings.flyoutMenuColor === 'dark' && settings.flyoutMenuType !== 'default',
          [style.air__menuFlyout__white]:
            settings.flyoutMenuColor === 'white' && settings.flyoutMenuType !== 'default',
          [style.air__menuFlyout__gray]:
            settings.flyoutMenuColor === 'gray' && settings.flyoutMenuType !== 'default'
        })}
        // style={menuWidthStyle}
      >
        <div
          className={style.air__menuLeft__outer}
        // style={menuWidthStyle}
        >
          <a
            href='#'
            className={style.air__menuLeft__mobileToggleButton}
            onClick={toggleMobileMenu}
          >
            <span />
          </a>
          <a href='#' className={style.air__menuLeft__toggleButton} onClick={toggleMenu}>
            <span />
            <span />
          </a>
          <div className={style.air__menuLeft__logo}>
            <div className={style.air__menuLeft__logo__letter}>
              <Link to='/'>
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
              </Link>
            </div>
            <div>
              <div className={style.air__menuLeft__logo__name}><Link to='/'>Bình Sơn</Link></div>
              <div className={style.air__menuLeft__logo__descr}>Hệ thống giám sát ắc quy</div>
            </div>
          </div>

          <PerfectScrollbar>
            <div id='menu-left-container' className={style.air__menuLeft__container}>
              <ul style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>{items}</ul>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
      <a href='#' className={style.air__menuLeft__backdrop} onClick={toggleMobileMenu} />
    </Sider>
  )
}

export default withRouter(connect(mapStateToProps)(MenuLeft))
