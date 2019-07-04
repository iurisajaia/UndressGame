import React, { Component } from "react";
import { Link } from "react-router-dom";
import MusicSvg from "./musicSvg";
import MuteSvg from "./muteSvg";

class Welcome extends Component {
  state = {
    sound: this.props.sound
  };

  changeVolume = () => {
    this.setState({
      sound: this.props.sound ? false : true
    });
    this.props.changeSound();
  };
  render() {
    console.log("welcome", this.state.sound);
    return (
      <>
        <div className="welcome-wraper">
          <div className="menu">
            <ul>
              <li>
                <span className="button" onClick={this.props.startGame}>
                  თამაში
                </span>
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
            {this.state.sound ? (
              <div className="svg-box" onClick={this.changeVolume}>
                <MuteSvg />{" "}
              </div>
            ) : (
              <div className="svg-box" onClick={this.changeVolume}>
                <MusicSvg />
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Welcome;
