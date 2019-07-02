import React, { Component } from "react";
import MedalSvg from "./medal";
class Person extends Component {
  state = {};
  render() {
    return (
      <li className="ranking-list-item">
        <div className="ranking-box">
          <div className="rank">1.</div>
          <div className="person">
            <span className="name">John Doe</span>
            <span className="point">15 000</span>
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
