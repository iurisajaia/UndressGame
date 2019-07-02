import React, { Component } from "react";
import Person from "./person";
import Header from "../header";

class Rank extends Component {
  state = {};
  render() {
    return (
      <>
        <Header />
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
      </>
    );
  }
}

export default Rank;
