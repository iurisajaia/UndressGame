import React, { Component } from "react";
import { Link } from "react-router-dom";
import MusicSvg from "./musicSvg";
import MuteSvg from "./muteSvg";

class Welcome extends Component {
  state = {
    music: false
  };

  changeVolume = () => {
    this.setState({
      music: this.state.music ? false : true
    });
  };
  render() {
    return (
      <>
        <div className="welcome-wraper">
          <div className="menu">
            <ul>
              <li>
                <Link className="button" onClick={this.props.startGame}>
                  თამაში
                </Link>
              </li>
              <li>
                <Link className="button" to="/ranking">
                  ლიდერები
                </Link>
              </li>
              <li>
                <Link className="button" to="/info">
                  წესები
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer">
            {this.state.music ? (
              <div className="svg-box" onClick={this.changeVolume}>
                {" "}
                <MusicSvg />{" "}
              </div>
            ) : (
              <div className="svg-box" onClick={this.changeVolume}>
                <MuteSvg />
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Welcome;
