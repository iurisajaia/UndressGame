import React, { Component } from "react";
import MedalSvg from "./medal";
class Person extends Component {
  state = {};
  render() {
    console.log(this.props)
    return (
      <li className="ranking-list-item">
        <div className="ranking-box">
          <div className="rank">{this.props.i}</div>
          <div className="person">
            <span className="name">{this.props.name}</span>
            <span className="point">{this.props.score}</span>
          </div>
          <div className="medal">
            <MedalSvg />
          </div>
        </div>
      </li>
    );
  }
}

export default Person;
