import { useState, useRef } from 'react'
import './collectData.scss'
import BlockModal from './blockModal'
import TitleIcon from './titleIcon'
import { Pagination } from 'antd'
import { getBlockColor } from 'constant'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = ({ dispatch }) => {
  return { dispatch }
}
const BlockList = ({ data = [], dispatch }) => {
  const [modal, setModal] = useState()
  const [pageIndex, setPageIndex] = useState(1)
  const thisRef = useRef()

  const windowWidth = window.innerWidth
  let onePageNumBlocks = 0
  if (windowWidth < 992) {
    onePageNumBlocks = 100
  } else {
    const elemWidth = thisRef.current ? thisRef.current.offsetWidth : 0
    if (elemWidth >= 320) onePageNumBlocks = 80
    // if (elemWidth >= 350) onePageNumBlocks = 91;
    if (elemWidth >= 400) onePageNumBlocks = 100
    if (elemWidth >= 600) onePageNumBlocks = 150
    // else if (elemWidth > )

    // onePageNumBlocks = elemWidth ? 100 : 0
  }

  return (
    <div ref={thisRef} className='custom-card collected-data'>
      <div className='custom-card__header'>
        <TitleIcon />
        <h2 className='custom-card__title'>Số liệu thu thập</h2>
      </div>
      {data.sort((a, b) => {
        const current = parseInt(a.localBlockId)
        const next = parseInt(b.localBlockId)
        if (current < next) {
          return -1
        }
        if (current > next) {
          return 1
        }
        return 0
      }).map((block, index) => (
        <input className='debug-block-item' key={index} type='hidden' value={`localBlockId=${block.localBlockId}, index=${index + 1}`} />
      ))}
      <BlockModal modal={modal} setModal={setModal} />
      <div className='custom-card__body'>
        <div className='block-box'>
          {[...new Array(onePageNumBlocks)].map((block, index) => {
            const skip = (pageIndex - 1) * onePageNumBlocks
            const i = skip + index
            if (data.length < i || !data[i]) {
              return
            }
            const item = data[i]
            return (
              <div
                key={index}
                onClick={() => setModal(item)}
                className='block'
                style={{ backgroundColor: getBlockColor(item) }}
              >
                {item.localBlockId || index + 1}
              </div>
            )
          })}
        </div>
      </div>
      <div className='custom-card__foot'>
        <Pagination
          size='small'
          defaultCurrent={1}
          onChange={setPageIndex}
          total={data.length}
          pageSize={onePageNumBlocks}
          showSizeChanger={false}
          showQuickJumper={false}
        />
      </div>
    </div>
  )
}
export default withRouter(connect(mapStateToProps)(BlockList))
