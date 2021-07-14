import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = ({ }) => {
  
}

const ChangePassword = ({
}) => {
  return (
    <>
      <div className="change-password">
        <p>Chưa phát hành</p>
      </div>
    </>
  )
}
export default withRouter(connect(mapStateToProps)(ChangePassword))
