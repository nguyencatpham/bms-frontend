import React, { lazy, Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import Layout from 'layouts'

const routes = [
  // VB:REPLACE-START:ROUTER-CONFIG
  {
    path: '/dashboard',
    Component: lazy(() => import('pages/dashboard')),
    exact: true
  },

  // VB:REPLACE-END:ROUTER-CONFIG
  {
    path: '/auth/login',
    Component: lazy(() => import('pages/auth/login')),
    exact: true
  },
  {
    path: '/auth/forgot-password',
    Component: lazy(() => import('pages/auth/forgot-password')),
    exact: true
  },
  {
    path: '/auth/register',
    Component: lazy(() => import('pages/auth/register')),
    exact: true
  },
  {
    path: '/auth/lockscreen',
    Component: lazy(() => import('pages/auth/lockscreen')),
    exact: true
  },
  {
    path: '/auth/404',
    Component: lazy(() => import('pages/auth/404')),
    exact: true
  },
  {
    path: '/auth/500',
    Component: lazy(() => import('pages/auth/500')),
    exact: true
  },

  {
    path: '/accounts',
    Component: lazy(() => import('pages/account')),
    exact: true
  },
  {
    path: '/accounts/create',
    Component: lazy(() => import('pages/account/create')),
    exact: true
  },
  {
    path: '/accounts/:id',
    Component: lazy(() => import('pages/account/detail')),
    exact: true
  },
  {
    path: '/accounts/:id/update',
    Component: lazy(() => import('pages/account/update')),
    exact: true
  },
  {
    path: '/accounts/:id/attach',
    Component: lazy(() => import('pages/account/detail/device-attach')),
    exact: true
  },
  {
    path: '/devices',
    Component: lazy(() => import('pages/device')),
    exact: true
  },
  {
    path: '/devices/create',
    Component: lazy(() => import('pages/device/create')),
    exact: true
  },
  {
    path: '/devices/:id',
    Component: lazy(() => import('pages/device/detail')),
    exact: true
  },
  {
    path: '/devices/:id/update',
    Component: lazy(() => import('pages/device/update')),
    exact: true
  },
  {
    path: '/events',
    Component: lazy(() => import('pages/event')),
    exact: true
  },
  // {
  //   path: '/block-info',
  //   Component: lazy(() => import('pages/dashboard/home/Charts/blockStatus/info')),
  //   exact: true
  // },
  {
    path: '/logout',
    Component: lazy(() => import('pages/logout')),
    exact: true
  }
]

const mapStateToProps = ({ settings }) => ({
  routerAnimation: settings.routerAnimation
})

const Router = ({ history, routerAnimation }) => {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Route
          render={(state) => {
            const { location } = state
            return (
              <SwitchTransition>
                <CSSTransition
                  key={location.pathname}
                  appear
                  classNames={routerAnimation}
                  timeout={routerAnimation === 'none' ? 0 : 300}
                >
                  <Switch location={location}>
                    {/* VB:REPLACE-NEXT-LINE:ROUTER-REDIRECT */}
                    <Route exact path='/' render={() => <Redirect to='/dashboard' />} />
                    {routes.map(({ path, Component, exact }) => (
                      <Route
                        path={path}
                        key={path}
                        exact={exact}
                        render={() => {
                          return (
                            <div className={routerAnimation}>
                              <Suspense fallback={null}>
                                <Component />
                              </Suspense>
                            </div>
                          )
                        }}
                      />
                    ))}
                    <Redirect to='/auth/404' />
                  </Switch>
                </CSSTransition>
              </SwitchTransition>
            )
          }}
        />
      </Layout>
    </ConnectedRouter>
  )
}

export default connect(mapStateToProps)(Router)
