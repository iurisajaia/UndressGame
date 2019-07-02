import React, { Component } from "react";
import Person from "./person";

class Rank extends Component {
  state = {};
  render() {
    return (
      <ul className="ranking-list">
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
      </ul>
    );
  }
}

export default Rank;
