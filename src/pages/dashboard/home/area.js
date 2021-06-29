
import React, { useEffect } from 'react'
import Chart from 'react-apexcharts'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import _ from 'lodash'

const mapStateToProps = ({ user, event, dispatch }) => {
  const { listTimeSeries = [] } = event
  const dayName = item => moment(item.timestamp, 'YYYY-MM-DD').format('DD/MM')
  const list = _.groupBy(listTimeSeries, dayName) || []
  const timestamps = Object.keys(list)
  const warnings = []
  const disconnects = []
  const alerts = []

  Object.keys(list).forEach(dayName => {
    warnings.push(_.sumBy(list[dayName], item => {
      return item.priority === 2
    }))
    alerts.push(_.sumBy(list[dayName], item => {
      return item.priority === 1
    }))
    disconnects.push(_.sumBy(list[dayName], item => {
      return item.priority === 3
    }))
  })
  console.log('conto', timestamps, warnings, disconnects, alerts)
  return { list, user, timestamps, warnings, disconnects, alerts, dispatch }
}
const DefaultPage = ({ list, systemId, timestamps, warnings, disconnects, alerts, dispatch }) => {
  useEffect(() => {
    const start = moment().add('-30', 'days').toISOString()
    const end = moment().toISOString()
    dispatch({
      type: 'event/LIST_TIMESERIES',
      payload: {
        filter: JSON.stringify({
          skip: 0,
          limit: 1000,
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
        categories: timestamps
      }
    },
    colors: ['#75cb6e', '#faad14', '#f64b4e'],
    series: [
      {
        name: 'Báo động',
        data: alerts
      },
      {
        name: 'Cảnh báo',
        data: warnings
      },
      {
        name: 'Mất kết nối',
        data: disconnects
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
