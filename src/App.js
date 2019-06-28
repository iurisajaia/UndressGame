import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    position: 0,
    movespeed: 30
  };

  moveBox = e => {
    if (e.keyCode == 37) {
      var left = this.state.position - this.state.movespeed;
      this.setState({ position: left });
    } else if (e.keyCode == 39) {
      var left = this.state.position + this.state.movespeed;
      this.setState({ position: left });
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.moveBox, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.moveBox, false);
  }

  render() {
    return (
      <>
        <div className="game" onKeyDown={this.moveBox}>
          <div id="bottle" />
          <div id="box" style={{ left: `${this.state.position}px` }} />
        </div>
      </>
    );
  }
}

export default App;
