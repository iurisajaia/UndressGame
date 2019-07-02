import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Header extends Component {
  state = {};
  render() {
    return (
      <div className="game-header">
        <NavLink to="/" exact>
          მთავარი
        </NavLink>
        <NavLink to="/ranking">ლიდერები</NavLink>
        <NavLink to="/info">წესები</NavLink>
      </div>
    );
  }
}

export default Header;
