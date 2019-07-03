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
          {this.props.users &&
            this.props.users.map(user => {
              return (
                <Person key={user.id} name={user.name} score={user.score} />
              );
            })}
        </ul>
      </>
    );
  }
}

export default Rank;
