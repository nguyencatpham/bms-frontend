import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import style from './style.module.scss'

const General14 = () => {
  return (
    <div>
      <div className="height-300 d-flex flex-column justify-content-end">
        <PerfectScrollbar>
          <div className={style.contentWrapper}>
            <div className={`${style.message} ${style.answer}`}>
              <div className={style.messageContent}>
                <div className="text-gray-4 font-size-12 text-uppercase">Quỳnh, 14 giây trước</div>
                <div>Bạn đang gặp sự cố? </div>
              </div>
              <div className={`${style.messageAvatar} vb__utils__avatar`}>
                <img src="resources/images/avatars/2.jpg" alt="Mary Stanform" />
              </div>
            </div>
          </div>
        </PerfectScrollbar>
      </div>
      <div className="pt-2 pb-2">Quỳnh đang nhắn...</div>
      <form>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Gửi tin nhắn..."
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fe fe-send align-middle" />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default General14
