import React, { Component } from "react";
import Welcome from "../welcome/welcome";
import HeartSvg from "./heartSvg";
import DropSound from "../../sounds/drop.mp3";
import BreakSound from "../../sounds/break.mp3";
import HouseSvg from "./houseSvg";
import PauseSvg from "./pauseSvg";
import PlaySvg from "./playSvg";
import SubmitForm from "../submitScore/SubmitForm";
import MuteSvg from "../welcome/muteSvg";
import MusicSvg from "../welcome/musicSvg";
import GG from "../../img/gg.png";
import GB from "../../img/game-background.jpg";

import Box from "../../img/free.png";
import BoxOne from "../../img/box1.png";
import BoxTwo from "../../img/box2.png";
import BoxThree from "../../img/box3.png";

class Game extends Component {
  state = {
    dev_width: document.getElementById("root").offsetWidth,
    dev_height: "",
    box_width: "",
    box_height: "",
    bottle_width: "",
    bottle_height: "",
    position: 200,
    bottles: [],
    intervals: [],
    score: 0,
    lose: 0,
    started: false,
    level: 0,
    paused: false,
    soundOn: false,
    currentTime: 0.0,
    sound: this.props.sound,
    templates: [],
    occupation: 0
  };

  moveBoxWithMouse = e => {
    var screenWidth = document.getElementById("root").offsetWidth;

    if (
      e.touches[0].clientX <
      screenWidth * this.state.occupation + this.state.box_width / 2
    ) {
      this.setState({ position: screenWidth * this.state.occupation });
    } else if (e.touches[0].clientX > screenWidth - this.state.box_width / 2) {
      this.setState({ position: screenWidth - this.state.box_width });
    } else {
      this.setState({
        position: e.touches[0].clientX - this.state.box_width / 2
      });
    }
  };

  componentDidMount() {
    switch (this.props.template) {
      case 0:
        var templates = ["#000000", "#333333"];
        this.setState({ templates });
        break;

      case 1:
        var templates = ["#ffffff", "#555555"];
        this.setState({ templates });
        break;

      case 2:
        var templates = ["darkred", "darkgreen"];
        this.setState({ templates });
        break;

      case 3:
        var templates = ["darkblue", "yellow"];
        this.setState({ templates });
        break;
    }

    this.setState({
      dev_width: window.innerWidth,
      dev_height: window.innerHeight,
      box_width: window.innerWidth / 4,
      box_height: (window.innerWidth * 3) / 16,
      bottle_width: window.innerWidth * 0.06,
      bottle_height: window.innerWidth * 0.18
    });
    var bottles = [];
    let intervals = [];
    for (let i = 0; i < 10; i++) {
      var coor_x =
        (Math.random() * this.state.dev_width) %
        (this.state.dev_width - this.state.bottle_width);
      let minSpeedOfLevel = Math.floor(i / 10) + 20;
      let time = 65 / (Math.abs(Math.random() * 0.4 + 1) * minSpeedOfLevel);
      let delay = i * 0.9;
      intervals.push(delay);
      bottles.push({
        coor_x: coor_x,
        id: i,
        time: time,
        delay: delay
      });
    }
    this.setState({ bottles, intervals });
  }

  startGame = () => {
    // this.setState({ lose: 0, score: 0, started: true, paused: false });
    var bottles = [];
    let intervals = [];
    for (let i = 0; i < 10; i++) {
      var coor_x =
        (Math.random() * this.state.dev_width) %
        (this.state.dev_width - this.state.bottle_width);
      let minSpeedOfLevel = Math.floor(i / 10) + 20;
      let time = 65 / (Math.abs(Math.random() * 0.4 + 1) * minSpeedOfLevel);
      let delay = i * 0.9;
      intervals.push(delay);
      bottles.push({
        coor_x: coor_x,
        id: i,
        time: time,
        delay: delay
      });
    }
    this.setState({
      bottles,
      intervals,
      lose: 0,
      score: 0,
      started: true,
      paused: false
    });
  };

  stopGame = () => {
    this.setState({ lose: 0, score: 0, started: false });
  };

  pauseGame = () => {
    this.state.paused
      ? this.setState({ paused: false, sound: this.props.sound ? false : true })
      : this.setState({ paused: true, sound: this.props.sound ? false : true });

    this.props.changeSound();
  };

  fallen = a => {
    let temp = this.state.bottles;
    let minSpeedOfLevel = Math.floor(temp.length / 10) + 20;
    let time = 65 / (Math.abs(Math.random() * 0.4 + 1) * minSpeedOfLevel);
    let intervals = this.state.intervals;
    let desiredInterval =
      intervals[intervals.length - 1] +
      temp[temp.length - 1].time * (Math.random() * 0.3 + 0.2);
    let delay = desiredInterval - (intervals[a] + temp[a].time);
    this.setState({ intervals: [...intervals, desiredInterval] });
    temp[a] = "";
    this.setState({
      bottles: [
        ...temp,
        {
          coor_x:
            (Math.random() * this.state.dev_width) %
            (this.state.dev_width - this.state.bottle_width),
          id: temp.length,
          time: time,
          delay: delay
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
          elem.left > this.state.position - this.state.bottle_width &&
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

  changeSound = () => {
    this.setState({
      sound: this.props.sound ? false : true
    });
    this.props.changeSound();
  };

  changeOccupation = () => {
    this.setState({
      occupation: this.state.occupation ? 0 : 0.2
    });
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
              <div
                className="game"
                id="game"
                style={{
                  backgroundImage:
                    this.state.occupation == 0 ? `url('${GB}')` : `url('${GG}')`
                }}
              >
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

                    {this.props.sound ? (
                      <div className="svg-box" onClick={this.changeSound}>
                        <MusicSvg />
                      </div>
                    ) : (
                      <div className="svg-box" onClick={this.changeSound}>
                        <MuteSvg />{" "}
                      </div>
                    )}
                  </div>
                ) : null}
                {this.state.lose == 3 ? (
                  <SubmitForm
                    users={this.props.users}
                    score={this.state.score}
                    startGame={this.startGame}
                    stopGame={this.stopGame}
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
                            animationDuration: `${bottle.time}s`,
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
                {!this.state.paused ? (
                  <div
                    id="box"
                    style={{
                      left: `${this.state.position}px`,
                      backgroundImage:
                        (!this.state.score && `url(${Box})`) ||
                        (this.state.score == 1 && `url(${BoxOne})`) ||
                        (this.state.score == 2 && `url(${BoxTwo})`) ||
                        `url(${BoxThree})`
                    }}
                  />
                ) : null}
              </div>
            </div>
          </>
        ) : (
          <Welcome
            changeSound={this.props.changeSound}
            sound={this.props.sound}
            startGame={this.startGame}
            occupation={this.state.occupation}
            changeOccupation={this.changeOccupation}
          />
        )}
      </>
    );
  }
}

export default Game;
