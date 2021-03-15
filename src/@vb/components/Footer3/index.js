import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import style from './style.module.scss'

const mapStateToProps = ({ settings }) => ({ settings })

const Footer = ({ settings: { isContentMaxWidth, logo, version } }) => {
  return (
    <div
      className={classNames(style.footerDark, {
        [style.footerFullWidth]: !isContentMaxWidth
      })}
    >
      <div className={`${style.outer} pt-5 pb-4`}>
        <div className={style.container}>
          <div className='row'>
            <div className='col-md-6 col-lg-4'>
              <h5 className='font-weight-bold mb-4'>Liên kết</h5>
              <div className='row'>
                <div className='col-sm-6'>
                  <div className='d-flex flex-column'>
                    <a className='mb-1 vb__utils__link' href='#'>
                      Giới thiệu
                    </a>
                    <a className='mb-1 vb__utils__link' href='#'>
                      Sản phẩm
                    </a>
                    <a className='mb-1 vb__utils__link' href='#'>
                      Giải pháp
                    </a>
                    <a className='mb-1 vb__utils__link' href='#'>
                      Đối tác
                    </a>
                  </div>
                </div>
                <div className='col-sm-6'>
                  <div className='d-flex flex-column mb-4'>
                    <a className='mb-1 vb__utils__link' href='#'>
                      Khách hàng
                    </a>
                    <a className='mb-1 vb__utils__link' href='#'>
                      Tin tức và sự kiện
                    </a>
                    <a className='mb-1 vb__utils__link' href='#'>
                      Chính sách bảo mật
                    </a>
                    <a className='mb-1 vb__utils__link' href='#'>
                      Liên hệ
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-12 col-lg-4'>
              <h5 className='font-weight-bold mb-4'>Về Chúng Tôi</h5>
              <p style={{ textAlign: 'justify' }}>Với hơn 50 nhân viên tư vấn trên mọi phương diện, không chỉ là hướng dẫn và xử lý các vấn đề từ BSE, chúng tôi luôn mong muốn chia sẻ các kinh nghiệm giúp bạn quản lý hoạt động kinh doanh dễ dàng hơn.</p>
            </div>
            <div className='col-md-6 col-lg-4'>
              <h5 className='font-weight-bold mb-4'>Đăng ký nhận tin</h5>
              <input
                className={`form-control mb-4 ${style.input}`}
                type='email'
                placeholder='Email của bạn'
              />
              <button type='button' className='btn btn-primary'>
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`${style.bottom} py-4`}>
        <div className={style.container}>
          <div className='d-sm-flex align-items-sm-center'>
            <div className={`clearfix mr-sm-auto ${style.logo}`}>
              <div className={style.logo__letter}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  version='1.1'
                  height='24px'
                  width='24px'
                >
                  <g>
                    <path
                      fill='#4b7cf3'
                      strokeWidth='1'
                      stroke='#4b7cf3'
                      d='M12,10.9c-0.1,0-0.2,0-0.2-0.1L3.5,6.1C3.4,6,3.3,5.8,3.3,5.6c0-0.2,0.1-0.3,0.2-0.4l8.2-4.7c0.2-0.1,0.3-0.1,0.5,0      l8.2,4.7c0.2,0.1,0.2,0.3,0.2,0.4S20.6,6,20.5,6.1l-8.2,4.7C12.2,10.8,12.1,10.9,12,10.9z M4.8,5.6L12,9.8l7.2-4.2L12,1.5      L4.8,5.6z'
                    />
                    <path
                      fill='#4b7cf3'
                      strokeWidth='1'
                      stroke='#4b7cf3'
                      d='M13.6,23.6c-0.1,0-0.2,0-0.2-0.1c-0.2-0.1-0.2-0.3-0.2-0.4v-9.5c0-0.2,0.1-0.3,0.2-0.4l8.2-4.7c0.2-0.1,0.3-0.1,0.5,0      c0.2,0.1,0.2,0.3,0.2,0.4v9.5c0,0.2-0.1,0.3-0.3,0.4l-8.2,4.7C13.8,23.6,13.7,23.6,13.6,23.6z M14.1,13.9v8.3l7.2-4.2V9.8      L14.1,13.9z'
                    />
                    <path
                      fill='#4b7cf3'
                      strokeWidth='1'
                      stroke='#4b7cf3'
                      d='M10.4,23.6c-0.1,0-0.2,0-0.2-0.1l-8.2-4.7c-0.2-0.1-0.3-0.3-0.3-0.4V8.9c0-0.2,0.1-0.3,0.2-0.4c0.2-0.1,0.3-0.1,0.5,0      l8.2,4.7c0.2,0.1,0.2,0.3,0.2,0.4v9.5c0,0.2-0.1,0.3-0.2,0.4C10.5,23.6,10.5,23.6,10.4,23.6z M2.7,18.1l7.2,4.2v-8.3L2.7,9.8      V18.1z'
                    />
                  </g>
                </svg>
              </div>
              <div className={style.logo__name}>{logo}</div>
              <div className={style.logo__descr}>{version}</div>
            </div>
            {/* <div className='d-flex flex-column flex-sm-row'>
              <a className='mb-1 mb-sm-0 px-sm-3' href='#'>
                About
              </a>
              <a className='mb-1 mb-sm-0 px-sm-3' href='#'>
                Terms of Use
              </a>
              <a className='mb-1 mb-sm-0 px-sm-3' href='#'>
                Buy Now
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Footer)
