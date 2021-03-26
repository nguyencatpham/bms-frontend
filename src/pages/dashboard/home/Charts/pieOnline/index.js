import React, { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2'
import faker from 'faker'
import style from './style.module.scss'

const Chart9 = () => {
  const tooltip = React.createRef()
  const [myRef, setMyRef] = useState(null)
  const [legend, setLegend] = useState(undefined)

  useEffect(() => {
    const leg = generateLegend()
    setLegend(leg)
  })

  const setTextInputRef = element => {
    setMyRef(element)
  }

  const generateLegend = () => {
    if (!myRef) return null
    return myRef.chartInstance.generateLegend()
  }

  const createMarkup = () => {
    return { __html: legend }
  }

  const data = {
    labels: ['193 Đang hoạt động', '20 Mất kết nối', '213 Tổng cộng'],
    datasets: [
      {
        data: [faker.random.number(1000), faker.random.number(1000), faker.random.number(1000)],
        backgroundColor: ['#52c41a', '#8c8c8c', '#f0f0f0'],
        borderColor: '#fff',
        borderWidth: 2,
        hoverBorderWidth: 0,
        borderAlign: 'inner'
      }
    ]
  }

  const options = {
    animation: true,
    responsive: true,
    cutoutPercentage: 70,
    legend: {
      display: false
    },
    tooltips: {
      enabled: false,
      custom: tooltipData => {
        const tooltipEl = tooltip.current
        tooltipEl.style.opacity = 1
        if (tooltipData.opacity === 0) {
          tooltipEl.style.opacity = 0
        }
      },
      callbacks: {
        label: (tooltipItem, itemData) => {
          const dataset = itemData.datasets[0]
          const value = dataset.data[tooltipItem.index]
          tooltip.current.innerHTML = value
        }
      }
    },
    legendCallback: chart => {
      const { labels } = chart.data
      let legendMarkup = []
      const dataset = chart.data.datasets[0]
      legendMarkup.push('<div class="kit__c9__chartLegend flex-shrink-0">')
      let legends = labels.map((label, index) => {
        const color = dataset.backgroundColor[index]
        return `<div class="d-flex align-items-center flex-nowrap mt-2 mb-2"><div class="tablet mr-3" style="background-color: ${color}"></div>${label}</div>`
      })
      legends = legends.join('')
      legendMarkup.push(legends)
      legendMarkup.push('</div>')
      legendMarkup = legendMarkup.join('')
      return legendMarkup
    }
  }

  return (
    <div>
      <div className='text-dark font-size-18 font-weight-bold mb-1'>Thống kê số lượng ắc quy</div>
      <div className='text-gray-6 mb-2'>Thống kê số lượng ắc quy trong hệ thống.</div>
      <div className='d-flex flex-wrap align-items-center'>
        <div className='mr-3 mt-3 mb-3 position-relative'>
          <Pie
            ref={element => setTextInputRef(element)}
            data={data}
            options={options}
            width={140}
            height={140}
          />
          <div className={`${style.tooltip} text-gray-5 font-size-28`} ref={tooltip} />
        </div>
        <div dangerouslySetInnerHTML={createMarkup()} />
      </div>
    </div>
  )
}

export default Chart9
