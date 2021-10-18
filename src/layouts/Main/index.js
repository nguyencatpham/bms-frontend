import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import './style.scss'

import Breadcrumbs2 from '@vb/components/Breadcrumbs2'
import MenuFlyout from '@vb/components/MenuFlyout'
import Variants from '@vb/components/Variants'
import SmSider from './smSider'
import LgSider from './lgSider'

const mapStateToProps = ({ settings }) => ({
  isMobileMenuOpen: settings.isMobileMenuOpen,
  isContentMaxWidth: settings.isContentMaxWidth,
  isAppMaxWidth: settings.isAppMaxWidth,
  isGrayBackground: settings.isGrayBackground,
  isSquaredBorders: settings.isSquaredBorders,
  isCardShadow: settings.isCardShadow,
  isBorderless: settings.isBorderless,
  isTopbarFixed: settings.isTopbarFixed,
  isTopbarSeparated: settings.isTopbarSeparated,
  isGrayTopbar: settings.isGrayTopbar,
  layoutTopbar: settings.layoutTopbar,
  layoutBreadcrumbs: settings.layoutBreadcrumbs,
  layoutFooter: settings.layoutFooter,
  layoutMenu: settings.layoutMenu,
})

let touchStartPrev = 0
let touchStartLocked = false

const MainLayout = ({
  dispatch,
  children,
  isMobileMenuOpen,
  isContentMaxWidth,
  isAppMaxWidth,
  isGrayBackground,
  isSquaredBorders,
  isCardShadow,
  isBorderless,
  isTopbarFixed,
  isTopbarSeparated,
  isGrayTopbar,
  layoutTopbar,
  layoutBreadcrumbs,
  layoutFooter,
  layoutMenu,
}) => {
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);
  // touch slide mobile menu opener
  useEffect(() => {
    const unify = (e) => {
      return e.changedTouches ? e.changedTouches[0] : e
    }
    document.addEventListener(
      'touchstart',
      (e) => {
        const x = unify(e).clientX
        touchStartPrev = x
        touchStartLocked = x > 70
      },
      { passive: false },
    )
    document.addEventListener(
      'touchmove',
      (e) => {
        const x = unify(e).clientX
        const prev = touchStartPrev
        if (x - prev > 50 && !touchStartLocked) {
          toggleMobileMenu()
          touchStartLocked = true
        }
      },
      { passive: false },
    )
  })

  const toggleMobileMenu = () => {
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isMobileMenuOpen',
        value: !isMobileMenuOpen,
      },
    })
  }

  return (
    <div
      className={classNames({
        vb__layout__grayBackground: isGrayBackground,
      })}
    >
      <Layout
      // className={classNames('vb__layout', {
      //   vb__layout__contentMaxWidth: isContentMaxWidth,
      //   vb__layout__appMaxWidth: isAppMaxWidth,
      //   vb__layout__squaredBorders: isSquaredBorders,
      //   vb__layout__cardsShadow: isCardShadow,
      //   vb__layout__borderless: isBorderless,
      // })}
      >
        {/* <Tutorial /> */}
        {/* <Variants /> */}
        <div className="sidebar">
          {/* <MenuFlyout /> */}
          <LgSider />
          <SmSider visible={mobileSidebarVisible} setMobileSidebarVisible={setMobileSidebarVisible}  />
        </div>

        {/* {layoutMenu === 'classic' && <MenuFlyout />} */}
        {/* {layoutMenu === 'flyout' && <MenuFlyout />} */}
        {/* {layoutMenu === 'simply' && <MenuFlyout />} */}
        {/* <Layout> */}
        {/* {layoutTopbar === 'v1' && (
            <TopbarWrapper>
              <TopBar />
            </TopbarWrapper>
          )} */}
        {/* {layoutBreadcrumbs === 'v1' && <Breadcrumbs />} */}
        {/* {layoutBreadcrumbs === 'v2' && <Breadcrumbs2 />} */}
        <div>
          <Breadcrumbs2 visible={mobileSidebarVisible} setMobileSidebarVisible={setMobileSidebarVisible} />
          <Layout.Content>{children}</Layout.Content>
        </div>

        {/* {layoutFooter === 'v1' && (
            <Layout.Footer>
              <Footer />
            </Layout.Footer>
          )} */}
        {/* {layoutFooter === 'v2' && (
            <Layout.Footer>
              <Footer2 />
            </Layout.Footer>
          )} */}
        {/* {layoutFooter === 'v3' && <Layout.Footer><Footer3 /></Layout.Footer>} */}
        {/* {layoutFooter === 'v4' && (
            <Layout.Footer>
              <Footer4 />
            </Layout.Footer>
          )} */}
      </Layout>
      {/* </Layout> */}
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(MainLayout))
