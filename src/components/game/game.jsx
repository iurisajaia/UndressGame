import React, { Component } from "react";
import Welcome from "../welcome/welcome";
import HeartSvg from "./heartSvg";

class Game extends Component {
  state = {
    dev_width: document.getElementById("root").offsetWidth,
    dev_height: "",
    box_width: "",
    box_height: "",
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
    lose: 0,
    started: false,
    level: 0,
    paused: false
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
    if (e.touches[0].clientX < this.state.box_width / 2) {
      this.setState({ position: 0 });
    } else if (e.touches[0].clientX > screenWidth - this.state.box_width / 2) {
      this.setState({ position: screenWidth - this.state.box_width });
    } else {
      this.setState({
        position: e.touches[0].clientX - this.state.box_width / 2
      });
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
    this.setState({
      dev_width: window.innerWidth,
      dev_height: window.innerHeight,
      box_width: window.innerWidth / 4,
      box_height: (window.innerWidth * 3) / 16
    });
    document.addEventListener("keydown", this.moveBox, false);
    var bottles = [];
    for (let i = 0; i < 20; i++) {
      var coor_x =
        (Math.random() * this.state.dev_width) % (this.state.dev_width - 30);
      bottles.push(coor_x);
      console.log(this.state.dev_width);
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
  startGame = () => {
    this.setState({ lose: 0, score: 0, started: true, paused: false });
  };
  stopGame = () => {
    this.setState({ lose: 0, score: 0, started: false });
  };
  pauseGame = () => {
    this.state.paused
      ? this.setState({ paused: false, movespeed: 10 })
      : this.setState({ paused: true, movespeed: 0 });
  };

  render() {
    if (
      this.state.bottles.length > 0 &&
      this.state.started &&
      this.state.lose != 3
    ) {
      var bottles = this.state.bottles;
    }
    var started = this.state.started;

    var lifes = [];
    for (var i = 0; i < 3 - this.state.lose; i++) {
      lifes.push(i);
    }
    return (
      <>
        {started ? (
          <>
            <div className="fullgame" onTouchMove={this.moveBoxWithMouse}>
              <div className="game" id="game">
                <div className="top-nav">
                  <div className="top-left">
                    <div>
                      {this.state.score ? (
                        <h1>{this.state.score * 100}</h1>
                      ) : (
                        <h1>0</h1>
                      )}
                    </div>
                    <div>
                      {this.state.started ? (
                        <div className="life-box">
                          {lifes.map(l => {
                            return <HeartSvg key={l} />;
                          })}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="top-right">
                    <button className="button" onClick={this.stopGame}>
                      Home
                    </button>

                    <button className="button" onClick={this.pauseGame}>
                      Pause
                    </button>
                  </div>
                </div>

                {this.state.paused ? (
                  <div className="paused-wraper">
                    <button className="button" onClick={this.pauseGame}>
                      Resume
                    </button>
                  </div>
                ) : null}

                {this.state.lose == 3 ? (
                  <>
                    <div className="text-center">
                      <h2>You Lose</h2>
                      <button className="button" onClick={this.startGame}>
                        Play Again
                      </button>
                    </div>
                  </>
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
                          animationDelay: `${this.state.bottles.indexOf(
                            bottle_x
                          ) - this.state.level}s`,
                          animationDuration: `${2 - this.state.level}s`,
                          animationPlayState: this.state.paused
                            ? "paused"
                            : null
                        }}
                      >
                        {" "}
                      </div>
                    );
                  })}
                {this.currentBottles}
                {!this.state.paused ? (
                  <div id="box" style={{ left: `${this.state.position}px` }} />
                ) : null}
              </div>
            </div>
          </>
        ) : (
          <Welcome startGame={this.startGame} />
        )}
      </>
    );
  }
}

export default Game;
