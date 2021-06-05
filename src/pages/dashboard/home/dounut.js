
import React from 'react'
import Chart from 'react-apexcharts'

const Donut = () => {
  const config = {
    options: {},
    series: [44, 55, 41, 17, 15],
    labels: ['A', 'B', 'C', 'D', 'E']
  }
  return (
    <div className='donut'>
      <Chart options={config.options} series={config.series} type='donut' width='380' />
    </div>
  )
}
export default Donut
