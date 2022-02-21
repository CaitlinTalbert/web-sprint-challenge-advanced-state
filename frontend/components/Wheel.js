import React from "react";
import { connect } from "react-redux";
import { moveClockwise, moveCounterClockwise } from "../state/action-creators";

export function Wheel(props) {
  const { moveClockwise, moveCounterClockwise } = props;

  const handleClockwise = (e) => {
    const { value } = e.target;
    // if (props.wheel >= 0 && props.wheel <= 4) {
    moveClockwise(value);
    // } else {
    // this.counter = 0;

    console.log(props);
  };

  const handleCounter = (e) => {
    const { value } = e.target;
    moveCounterClockwise(value);
    console.log(props);
  };

  return (
    //either active or not active
    // ? action ||
    // interpolate each line
    //props is wheel
    //{`${props.wheel === 0 ? "cog active" : "cog"}`} style={{ "--i": 0 }}>{props.wheel === 0 ? "B" : ""}
    <div id="wrapper">
      <div id="wheel">
        <div
          className={`${props.wheel === 0 ? "cog active" : "cog"}`}
          style={{ "--i": 0 }}
        >
          {props.wheel === 0 ? "B" : ""}
        </div>
        <div
          className={`${props.wheel === 1 ? "cog active" : "cog"}`}
          style={{ "--i": 1 }}
        >
          {props.wheel === 1 ? "B" : ""}
        </div>
        <div
          className={`${props.wheel === 2 ? "cog active" : "cog"}`}
          style={{ "--i": 2 }}
        >
          {props.wheel === 2 ? "B" : ""}
        </div>
        <div
          className={`${props.wheel === 3 ? "cog active" : "cog"}`}
          style={{ "--i": 3 }}
        >
          {props.wheel === 3 ? "B" : ""}
        </div>
        <div
          className={`${props.wheel === 4 ? "cog active" : "cog"}`}
          style={{ "--i": 4 }}
        >
          {props.wheel === 4 ? "B" : ""}
        </div>
        <div
          className={`${props.wheel === 5 ? "cog active" : "cog"}`}
          style={{ "--i": 5 }}
        >
          {props.wheel === 5 ? "B" : ""}
        </div>
        {/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleCounter}>
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={handleClockwise}>
          Clockwise
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    wheel: state.wheel.counter,
  };
};

export default connect(mapStateToProps, {
  moveCounterClockwise,
  moveClockwise,
})(Wheel);
