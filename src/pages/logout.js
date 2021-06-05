
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = ({ event, dispatch }) => {
  let { list, loading, total } = event
  if (typeof total === 'object') {
    total = total.count
  }
  return { list, loading, total, dispatch }
}

const DefaultPage = ({ dispatch }) => {
  useEffect(() => {
    dispatch({
      type: 'user/LOGOUT'
    })
  })
  return (
    <div />
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
