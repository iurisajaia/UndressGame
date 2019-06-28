import React, { Component } from "react";
import girl1 from "./img/girl1.jpg";
import girl2 from "./img/girl2.jpg";
import "./App.css";
class App extends Component {
  state = {
    position: 0,
    movespeed: 70,
    last_x: 30,
    bottles: [],
    index: 0,
    animationName: "down",
    score: 0,
    started: false
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
    // console.log(e.screenX)
    var screenWidth = document.getElementById('root').offsetWidth;
    var boxWidth = (screenWidth - 700) / 2;
    // console.log(boxWidth)
    if (e.screenX - boxWidth >= 0) {
      this.setState({ position: e.screenX - boxWidth });
    }
    if (e.screenX - boxWidth >= 50) {
      this.setState({ position: e.screenX - boxWidth });
    }

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
    var lastx = 350;
    document.addEventListener("keydown", this.moveBox, false);
    var bottles = [];
    for (let i = 0; i < 200; i++) {
      var coor_x =
        Math.abs(
          lastx +
          Math.pow(-1, Math.floor(Math.random() * 10)) * (Math.random() * 330)
        ) % 670;
      bottles.push(coor_x);
      lastx = coor_x;
    }

    this.setState({ bottles });
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.moveBox, false);
  }
  getCoords = a => {
    var bottleLeft = document.getElementById(a).getBoundingClientRect().left;
    var bottleRight = document.getElementById(a).getBoundingClientRect().right;

    var boxLeft = document.getElementById("box").getBoundingClientRect().left;
    var boxRight = document.getElementById("box").getBoundingClientRect().right;

    if (bottleLeft >= boxLeft - 25 && bottleRight <= boxRight + 25) {
      this.setState({ score: this.state.score + 1 });
    }
  };
  startGame = (e) => {
    this.setState({ started: this.state.started ? false : true })
    e.target.style.display = 'None';
  }

  render() {
    if (this.state.bottles.length > 0 && this.state.started) {
      var bottles = this.state.bottles;
    }
    return (
      <>

        <div className="fullgame">
          <div className="left">
            {this.state.score >= 10 && <img src={girl2} className="girl" />}
          </div>
          <div className="game" onMouseMove={this.moveBoxWithMouse}>
            {this.state.score && (
              <h1 className="score">{this.state.score > 0 ? this.state.score * 100 : null}</h1>
            )}
            <button className="start" onClick={this.startGame}>Start</button>
            {bottles &&
              bottles.map(bottle_x => {
                return (
                  <div
                    onAnimationEnd={() => {
                      this.getCoords(this.state.bottles.indexOf(bottle_x));
                    }}
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
            {this.currentBottles}
            <div id="box" style={{ left: `${this.state.position}px` }} >

            </div>
          </div>
          <div className="result">
            {this.state.score >= 20 && <img src={girl1} className="girl" />}
          </div>
        </div>
      </>
    );
  }
}

export default App;
