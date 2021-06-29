
import React, { useEffect } from 'react'
import Chart from 'react-apexcharts'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

const mapStateToProps = ({ user, event, dispatch }) => {
  const { listTimeSeries: list = [] } = event
  return { list, user, dispatch }
}
const DefaultPage = ({ list, systemId, dispatch }) => {
  useEffect(() => {
    const start = moment().add('-30', 'days').toISOString()
    const end = moment().toISOString()
    dispatch({
      type: 'event/LIST_TIMESERIES',
      payload: {
        filter: JSON.stringify({
          skip: 0,
          limit: 10000,
          fields: {
            priority: true,
            timestamp: true
          },
          where: {
            timestamp: { between: [start, end] },
            systemId,
            priority: { inq: [1, 2, 3] }
          },
          order: ['timestamp DESC']
        })
      }
    })
  }, [systemId, dispatch])
  const config = {
    options: {
      chart: {
        height: 350,
        type: 'area',
        stacked: false,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0)
          }
        }
      },
      xaxis: {
        type: 'datetime',
        categories: list.map(x => moment(x.timestamp))
      }
    },
    colors: ['#75cb6e', '#faad14', '#f64b4e'],
    series: [
      {
        name: 'Báo động',
        data: list.filter(x => x.priority === 1).map(x => x.priority)
      },
      {
        name: 'Cảnh báo',
        data: list.filter(x => x.priority === 2).map(x => x.priority)
      },
      {
        name: 'Mất kết nối',
        data: list.filter(x => x.priority === 3).map(x => x.priority)
      }
    ]
  }
  return (
    <div className='donut'>
      <Chart options={config.options} series={config.series} type='area' />
    </div>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
