import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = ({ }) => {
  
}

const UpdateInfo = ({
}) => {
  return (
    <>
      <div className="update-info">
        <p>Chưa phát hành</p>
      </div>
    </>
  )
}
export default withRouter(connect(mapStateToProps)(UpdateInfo))
