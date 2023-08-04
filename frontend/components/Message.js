import React from 'react'
import { connect } from 'react-redux'

function Message(props) {
  const {message} = props
  console.log(props)
  return <div id="message">{message}</div>
}

const mapStateToProps = state => ({
  message: state.message
})

export default connect(mapStateToProps)(Message)
