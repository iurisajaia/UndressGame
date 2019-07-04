import React, { Component } from "react";
import Welcome from "../welcome/welcome";
import HeartSvg from "./heartSvg";
import DropSound from "../../sounds/drop.mp3";
import BreakSound from "../../sounds/break.mp3";
import HouseSvg from "./houseSvg";
import PauseSvg from "./pauseSvg";
import PlaySvg from "./playSvg";
import SubmitForm from "../submitScore/SubmitForm";

class Game extends Component {
  state = {
    dev_width: document.getElementById("root").offsetWidth,
    dev_height: "",
    box_width: "",
    box_height: "",
    position: 0,
    bottles: [],
    index: 0,
    score: 0,
    lose: 0,
    started: false,
    level: 0,
    paused: false,
    soundOn: false,
    currentTime: 0.0
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

  componentDidMount() {
    this.setState({
      dev_width: window.innerWidth,
      dev_height: window.innerHeight,
      box_width: window.innerWidth / 4,
      box_height: (window.innerWidth * 3) / 16
    });
    document.addEventListener("keydown", this.moveBox, false);
    var bottles = [];
    for (let i = 0; i < 10; i++) {
      var coor_x =
        (Math.random() * this.state.dev_width) % (this.state.dev_width - 30);
      bottles.push({
        coor_x: coor_x,
        id: i,
        speed:
          Math.floor(i / 20) +
          8 +
          Math.abs(Math.random() * (Math.floor(i / 20 + 8) / 5)),
        delay:
          (bottles.length &&
            (20 / bottles[bottles.length - 1].speed) *
              (0.4 + Math.random() * 0.2) +
              bottles[bottles.length - 1].delay) ||
          1
      });
    }
    this.setState({ bottles });
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.moveBox, false);
  }

  startGame = () => {
    this.setState({ lose: 0, score: 0, started: true, paused: false });
  };

  stopGame = () => {
    this.setState({ lose: 0, score: 0, started: false });
  };

  pauseGame = () => {
    this.state.paused
      ? this.setState({ paused: false })
      : this.setState({ paused: true });
    console.log(this.state);
  };

  fallen = a => {
    let temp = this.state.bottles;
    temp[a] = "";
    let speed =
      Math.floor(temp.length / 20) +
      8 +
      Math.abs(Math.random() * (Math.floor(temp.length / 20 + 8) / 5));
    this.setState({
      bottles: [
        ...temp,
        {
          coor_x:
            (Math.random() * this.state.dev_width) %
            (this.state.dev_width - 30),
          id: temp.length,
          speed: speed,
          delay:
            (temp.length &&
              temp[temp.length - 1].delay *
                (speed / temp[temp.length - 1].speed)) ||
            1
        }
      ]
    });
  };

  handleAnimationStart = a => {
    setInterval(() => {
      if (document.getElementById(a) && !this.state.paused) {
        let elem = document.getElementById(a).getBoundingClientRect();
        this.setState({
          [`bottle${a % 10}`]: [elem.top, elem.right, elem.bottom, elem.left]
        });
        if (
          elem.left < this.state.position + this.state.box_width &&
          elem.left > this.state.position - 30 &&
          elem.bottom > this.state.dev_height - this.state.box_height
        ) {
          if (this.props.sound) {
            let audio = document.getElementById("audio");
            audio.play();
            audio.currentTime = this.state.currentTime;
          }

          this.setState({
            score: this.state.score + 1,
            soundOn: true,
            currentTime: 0.0
          });

          this.fallen(a);
        } else if (elem.bottom >= this.state.dev_height) {
          if (this.props.sound) {
            let breakSound = document.getElementById("break");
            breakSound.play();
            breakSound.currentTime = this.state.currentTime;
          }
          this.setState({
            lose: this.state.lose + 1,
            level: 0,
            currentTime: 0.0
          });

          this.fallen(a);
        }
      }
    }, 20);
  };

  render() {
    console.log("game", this.props.sound);
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
                {this.props.sound ? (
                  <>
                    <audio id="audio">
                      <source src={DropSound} />
                    </audio>
                    <audio id="break">
                      <source src={BreakSound} />
                    </audio>
                  </>
                ) : null}

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
                      <HouseSvg />
                    </button>

                    <button className="button" onClick={this.pauseGame}>
                      <PauseSvg />
                    </button>
                  </div>
                </div>
                {this.state.paused ? (
                  <div className="paused-wraper">
                    <button className="button" onClick={this.pauseGame}>
                      <PlaySvg />
                    </button>
                  </div>
                ) : null}
                {this.state.lose == 3 ? (
                  <SubmitForm
                    users={this.props.users}
                    score={this.state.score}
                    startGame={this.startGamef}
                  />
                ) : null}
                {bottles &&
                  bottles.map(bottle => {
                    if (bottle) {
                      return (
                        <div
                          onAnimationStart={() => {
                            this.handleAnimationStart(bottle.id);
                          }}
                          key={bottle.id}
                          id={bottle.id}
                          className="fallingItem"
                          style={{
                            left: `${bottle.coor_x}px`,
                            animationDelay: `${bottle.delay}s`,
                            animationDuration: `${20 / bottle.speed}s`,
                            animationPlayState: this.state.paused
                              ? "paused"
                              : null
                          }}
                        >
                          {" "}
                        </div>
                      );
                    }
                  })}
                {this.currentBottles}
                {!this.state.paused ? (
                  <div id="box" style={{ left: `${this.state.position}px` }} />
                ) : null}
                {!this.state.paused ? (
                  <div id="box" style={{ left: `${this.state.position}px` }} />
                ) : null}
              </div>
            </div>
          </>
        ) : (
          <Welcome
            changeSound={this.props.changeSound}
            sound={this.props.sound}
            startGame={this.startGame}
          />
        )}
      </>
    );
  }
}

export default Game;
