import React from 'react'
import { connect } from 'react-redux'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'

const Wheel = (props) => {
  const { placement, active, moveClockwise, moveCounterClockwise } = props
  return (
    <div id="wrapper">
      <div id="wheel">
        {placement.map(idx => {
          return (
            <div className = {`cog ${active === idx ? 'active' : ''}`} key={idx} style={{'--i': idx}}>{active === idx ? 'B' : ''}</div>
          )
        })} {/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={moveCounterClockwise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={moveClockwise}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    placement: state.wheel.location,
    active: state.wheel.active
  }
}

export default connect(mapStateToProps, {moveClockwise, moveCounterClockwise})(Wheel)