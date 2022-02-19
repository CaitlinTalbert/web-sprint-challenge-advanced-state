import React from 'react'
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';


export function Wheel(props) {
const {moveClockwise, moveCounterClockwise} = props;

const handleClockwise = (e) => {
  const {value} = e.target
  moveClockwise(value);
  console.log(props)
}

const handleCounter = () => {

}
  
  return (
    //either active or not active 
    // ? action || 
    // interpolate each line
    //props is wheel 
    //{`${props.wheel === 0 ? "cog active" : "cog"}`} style={{ "--i": 0 }}>{props.wheel === 0 ? "B" : ""}
    <div id="wrapper">
      <div id="wheel">
        <div className= {`${props.wheel === 0 ? "cog active" : "cog"}`} style={{ "--i": 0 }}>{props.wheel === 0 ? "B" : ""}</div>
        <div className="cog" style={{ "--i": 1 }}></div>
        <div className="cog" style={{ "--i": 2 }}></div>
        <div className="cog" style={{ "--i": 3 }}></div>
        <div className="cog" style={{ "--i": 4 }}></div>
        <div className="cog" style={{ "--i": 5 }}></div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleCounter}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={handleClockwise}>Clockwise</button>
      </div>
    </div>
  )
}

export default connect(st => st, actionCreators)(Wheel);
