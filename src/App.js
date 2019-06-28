import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    position: 0,
    movespeed: 70,
    last_x: 30,
    bottles: [],
    index: 0,
    started: false,
    animationName: "down"
  };
  currentBottles = <div> </div>;

  createBottle = () => {
    this.currentBottles =
      this.state.bottles &&
      this.state.bottles.map(bottle_x => {
        return (
          <div
            key={this.state.bottles.indexOf(bottle_x)}
            id={this.state.bottles.indexOf(bottle_x)}
            className="bottle"
            style={{
              left: `${bottle_x}px`,
              animationName: this.state.animationName,
              animationDuration: "0.6s",
              animationFillMode: "forwards"
            }}
          >
            {" "}
          </div>
        );
      });
  };
  moveBoxWithMouse = e => {
    if (e.screenX - 700 >= 0 && e.screenX - 700 <= 550) {
      this.setState({ position: e.screenX - 700 });
    }

    console.log(e.screenX - 700);
  };

  componentDidMount() {
    var lastx = 350;
    document.addEventListener("keydown", this.moveBox, false);
    var bottles = [];
    for (let i = 0; i < 200; i++) {
      var coor_x = Math.abs(
        lastx +
          Math.pow(-1, Math.floor(Math.random() * 10)) *
            (Math.random() * 350 + 20)
      );
      bottles.push(coor_x);
      lastx = coor_x;
    }

    this.setState({ bottles });
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.moveBox, false);
  }

  render() {
    if (this.state.bottles.length > 0) {
      var bottles = this.state.bottles;
    }
    return (
      <>
        <div className="game" onMouseMove={this.moveBoxWithMouse}>
          {bottles &&
            bottles.map(bottle_x => {
              return (
                <div
                  key={this.state.bottles.indexOf(bottle_x)}
                  id={this.state.bottles.indexOf(bottle_x)}
                  className="fallingItem"
                  style={{
                    left: `${bottle_x}px`,
                    animationDelay: `${this.state.bottles.indexOf(bottle_x)}s`
                  }}
                >
                  {" "}
                </div>
              );
            })}
          <button
            onClick={() => setInterval(this.fall(this.state.index), 1000)}
          >
            click
          </button>
          {this.currentBottles}
          <div id="box" style={{ left: `${this.state.position}px` }} />
        </div>
      </>
    );
  }
}

export default App;
