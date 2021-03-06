import React from 'react'
import SiderContent from './siderContent'
import { Layout } from 'antd'
import { history } from 'index'

export default function LgSider () {
  return (
    <Layout.Sider className='LgSider'>
      <div className='toggle-btn-wrap'>
        <a
          href='#'
          className='toggle-btn'
          // className={style.air__menuLeft__toggleButton}
          onClick={() => history.goBack()}
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-right"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg> */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='feather feather-chevron-left'
          >
            <polyline points='15 18 9 12 15 6' />
          </svg>
        </a>
      </div>

      <SiderContent />
    </Layout.Sider>
  )
}
