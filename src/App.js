import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Game from "./components/game";
import Ranking from "./components/ranking/rank";
import Header from "./components/header";
import Rule from "./components/rules/rule";
import "./App.css";
class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Route component={Game} path="/" exact />
          <Route component={Ranking} path="/ranking" />
          <Route component={Rule} path="/info" />
        </Router>
      </>
    );
  }
}

export default App;
