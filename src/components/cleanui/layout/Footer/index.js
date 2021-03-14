import React from 'react'
import style from './style.module.scss'

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.footerInner}>
        <a
          href='/'
          target='_blank'
          rel='noopener noreferrer'
          className={style.logo}
        >
          HỆ THỐNG QUẢN LÝ ẮC QUY KHU VỰC MIỀN NAM
          <span />
        </a>
        <br />
        {/* <p className="mb-0">
          Copyright © 2017-2020 Mdtk Soft |{' '}
          <a href="https://www.mediatec.org/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
        </p> */}
      </div>
    </div>
  )
}

export default Footer
