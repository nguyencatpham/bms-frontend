import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = ({ }) => {
  
}

const Activities = ({
}) => {
  return (
    <>
      <div className="activities">
        <p>Chưa phát hành</p>
      </div>
    </>
  )
}
export default withRouter(connect(mapStateToProps)(Activities))
