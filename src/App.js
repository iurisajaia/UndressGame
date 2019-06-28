import React, { Component } from 'react';
import './App.css';



class App extends Component {
  state = {
    position: 0,
    movespeed: 30
  }
  bottle = <div className="bottle" > </div>;


  moveBox = e => {


    if (e.keyCode == 37) {
      var left = this.state.position - this.state.movespeed;
      this.setState({ position: left })
    } else if (e.keyCode == 39) {
      var left = this.state.position + this.state.movespeed;
      this.setState({ position: left })
    }
  }





  componentDidMount() {
    document.addEventListener("keydown", this.moveBox, false);
    for (let i = 0; i <= 10; i++) {
      setInterval(() => {
        var bottle = <div className="bottle" > </div>
      }, 2000)
    }

  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.moveBox, false);
  }

  render() {
    return (
      <>
        <div className="game" onKeyDown={this.moveBox}>
          {this.bottle}
          <div id="box" style={{ left: `${this.state.position}px` }}>

          </div>
        </div>
      </>
    );
  }
}

export default App;

