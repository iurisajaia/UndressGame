import React, { Component } from "react";
import { Link } from "react-router-dom";
class Welcome extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="welcome-wraper">
          <div className="menu">
            <ul>
              <li>
                <Link onClick={this.props.startGame}>დაწყება</Link>
              </li>
              <li>
                <Link to="/ranking">ლიდერები</Link>
              </li>
              <li>
                <Link to="/info">წესები</Link>
              </li>
            </ul>
          </div>
          <div className="footer">Music</div>
        </div>
      </>
    );
  }
}

export default Welcome;
