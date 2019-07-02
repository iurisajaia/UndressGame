import React, { Component } from "react";

class Game extends Component {
  state = {
    position: 0,
    movespeed: 70,
    last_x: 30,
    bottles: [],
    bottles_l_1: [],
    bottles_l_2: [],
    bottles_l_3: [],
    bottles_l_4: [],
    bottles_l_5: [],
    bottles_l_6: [],
    bottles_l_7: [],
    bottles_l_8: [],
    bottles_l_9: [],
    bottles_l_0: [],
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
    var gameCoords = [
      document.getElementById("game").offsetLeft,
      document.getElementById("game").offsetLeft +
        document.getElementById("game").offsetWidth
    ];
    if (e.screenX < gameCoords[0] + 75) {
      this.setState({ position: 0 });
    } else if (e.screenX > gameCoords[1] - 75) {
      this.setState({ position: 550 });
    } else {
      this.setState({ position: e.screenX - 75 - (screenWidth - 700) / 2 });
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
    for (let i = 0; i < 20; i++) {
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
      <div className="fullgame" onMouseMove={this.moveBoxWithMouse}>
        <div className="game" id="game">
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
                    console.log(this.state.bottles);
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
      </div>
    );
  }
}

export default Game;
