import { useRef } from 'react'
import './collectData.scss'
import BlockModal from './blockModal'
import TitleIcon from './titleIcon'
import { Select, Tabs, Form, Input, Button, DatePicker, Pagination } from 'antd'

export default function CollectData({ dataArr }) {
  const blockModalRef = useRef()
  const thisRef = useRef()
  //   const size = useWindowSize()

  const handleClickBlock = (block) => {
    if (blockModalRef.current) blockModalRef.current.handleClick(block)
  }

  const windowWidth = window.innerWidth
  let onePageNumBlocks = 0
  if (windowWidth < 992) {
    onePageNumBlocks = 100
  } else {
    const elemWidth = thisRef.current ? thisRef.current.offsetWidth : 0
    if (elemWidth >= 320) onePageNumBlocks = 80;
    // if (elemWidth >= 350) onePageNumBlocks = 91;
    if (elemWidth >= 400) onePageNumBlocks = 100;
    if (elemWidth >= 600) onePageNumBlocks = 150;
    // else if (elemWidth > )

    // onePageNumBlocks = elemWidth ? 100 : 0
  }

  return (
    <div ref={thisRef} className="custom-card collected-data">
      <div className="custom-card__header">
        <TitleIcon />
        <h2 className="custom-card__title">Số liệu thu thập</h2>
      </div>
      <BlockModal ref={blockModalRef} />
      <div className="custom-card__body">
        <div className="block-box">
          {[...new Array(onePageNumBlocks)].map((block, index) => {
            const random = Math.floor(Math.random() * 5)
            const item = dataArr[random]
            //   console.log(item);
            return (
              <div
                key={index}
                onClick={() => handleClickBlock(index + 1)}
                className="block"
                style={{ backgroundColor: item.color }}
              >
                {index + 1}
              </div>
            )
          })}
        </div>
      </div>
      <div className="custom-card__foot">
        <Pagination
          size="small"
          current={3}
          defaultCurrent={1}
          total={100}
          showSizeChanger={false}
          showQuickJumper={false}
        />
      </div>
    </div>
  )
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    // Add event listener
    window.addEventListener('resize', handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}
