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
    lose: 1,
    started: false,
    level: 0
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
              animationFillMode: "forwards"
            }}
          >
            {" "}
          </div>
        );
      });
  };
  moveBoxWithMouse = e => {
    var screenWidth = document.getElementById("root").offsetWidth;
    // var boxWidth = (screenWidth - 700) / 2;

    // this.setState({ position: e.screenX - boxWidth });
    var gameCoords = [
      document.getElementById("game").offsetLeft,
      document.getElementById("game").offsetLeft +
        document.getElementById("game").offsetWidth
    ];
    if (e.screenX < gameCoords[0]) {
      this.setState({ position: 0 });
    } else if (e.screenX > gameCoords[1] - 150) {
      this.setState({ position: 550 });
    } else {
      this.setState({ position: e.screenX - (screenWidth - 700) / 2 });
    }
    // console.log(e.screenX - 600);
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
    if (bottleLeft <= boxLeft - 25 || bottleRight >= boxRight + 25) {
      this.setState({ lose: this.state.lose + 1, level: 0 });
    }

    if (this.state.score % 10 == 9) {
      this.setState({ level: this.state.level + 0.085 });
    }
  };
  startGame = e => {
    this.setState({ lose: 0, score: 0, started: true });
  };

  render() {
    if (
      this.state.bottles.length > 0 &&
      this.state.started &&
      this.state.lose != 3
    ) {
      var bottles = this.state.bottles;
    }
    return (
      <>
        <div className="fullgame" onMouseMove={this.moveBoxWithMouse}>
          {/* <div className="left">
            {this.state.score >= 10 && <img src={girl2} className="girl" />}
          </div> */}
          <div className="game" id="game" onMouseMove={this.moveBoxWithMouse}>
            {this.state.score && (
              <h1 className="score">
                {this.state.score > 0 ? this.state.score * 100 : null}
              </h1>
            )}
            <h3>{2 - this.state.level}</h3>
            <button className="start" onClick={this.startGame}>
              Start
            </button>
            {this.state.lose == 3 ? <h2 className="lose">You Lose</h2> : null}
            {this.state.started ? (
              <h2 className="life">{3 - this.state.lose}</h2>
            ) : null}
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
                      animationDelay: `${this.state.bottles.indexOf(bottle_x) -
                        this.state.level}s`,
                      animationDuration: `${2 - this.state.level}s`
                    }}
                  >
                    {" "}
                  </div>
                );
              })}
            {this.currentBottles}
            <div id="box" style={{ left: `${this.state.position}px` }} />
          </div>
          {/* <div className="result">
            {this.state.score >= 20 && <img src={girl1} className="girl" />}
          </div> */}
        </div>
      </>
    );
  }
}

export default App;
