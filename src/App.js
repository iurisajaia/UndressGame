import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    position: 0,
    movespeed: 50,
    last_x: 30,
    bottles: [],
    index: 0
  };
  currentBottles = <div> </div>;

  // fall = () => {
  //   return setInterval(() => {
  //     for (var i = 0; i < 450; i++) {
  //       document.getElementById(this.state.index).style.top = i;
  //     }
  //     this.setState({ index: this.state.index++ });
  //   }, 1000);
  // };

  // createBottle = () => {
  //   var bottles = [];
  //   for (let i = 0; i < 200; i++) {
  //     var coor_x = Math.abs(
  //       (this.state.last_x +
  //         Math.pow(-1, Math.floor(Math.random() * 10)) *
  //           (Math.random() * 350 + 20)) %
  //         700
  //     );
  //     bottles.push(coor_x);
  //   }
  //   this.setState({ last_x: coor_x, bottles });
  //   console.log(this.state);
  //   this.currentBottles =
  //     this.state.bottles &&
  //     this.state.bottles.map(bottle_x => {
  //       return (
  //         <div
  //           key={this.state.bottles.indexOf(bottle_x)}
  //           id={this.state.bottles.indexOf(bottle_x)}
  //           className="bottle"
  //           style={{ left: `${bottle_x}px` }}
  //         >
  //           {" "}
  //         </div>
  //       );
  //     });
  //   console.log(this.state);
  // };

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
    var bottles = [];
    document.addEventListener("keydown", this.moveBox, false);

    for (let i = 0; i < 200; i++) {
      var coor_x = Math.abs(
        (this.state.last_x +
          Math.pow(-1, Math.floor(Math.random() * 10)) *
            (Math.random() * 350 + 20)) %
          700
      );
      bottles.push(coor_x);
    }
    this.setState({ last_x: coor_x, bottles });

    this.currentBottles =
      this.state.bottles &&
      this.state.bottles.map(bottle_x => {
        return (
          <div
            key={this.state.bottles.indexOf(bottle_x)}
            id={this.state.bottles.indexOf(bottle_x)}
            className="bottle"
            style={{ left: `${bottle_x}px` }}
          >
            {" "}
          </div>
        );
      });
    // console.log(this.state);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.moveBox, false);
  }

  render() {
    console.log(this.state);
    return (
      <>
        {/* () => {
              this.fall(this.state.index);
              this.setState({ index: this.state.index++ });
            } */}

        <div className="game" onKeyDown={this.moveBox}>
          {/* <button onClick={this.createBottle}>click</button> */}
          {this.currentBottles}
          <div id="box" style={{ left: `${this.state.position}px` }} />
        </div>
      </>
    );
  }
}

export default App;
