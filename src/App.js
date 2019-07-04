import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Game from "./components/game/game";
import Ranking from "./components/ranking/rank";
import Rule from "./components/rules/rule";
import "./App.css";

import firebase from "./components/config/FirebaseConfig";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      sound: true
    };
  }
  componentDidMount() {
    firebase
      .firestore()
      .collection("ranking")
      .onSnapshot(
        snapshot => {
          this.setState({
            users: snapshot.docs.map(doc => {
              return {
                ...doc.data(),
                id: doc.id
              };
            })
          });
        },
        err => console.log(err)
      );
  }
  changeSound = () => {
    this.setState({ sound: this.state.sound ? false : true });
  };
  render() {
    console.log("app", this.state.sound);
    return (
      <>
        <Router>
          <Route
            render={props => (
              <Game
                {...props}
                changeSound={this.changeSound}
                sound={this.state.sound}
                users={this.state.users}
              />
            )}
            path="/"
            exact
          />
          <Route
            render={props => <Ranking {...props} users={this.state.users} />}
            path="/ranking"
          />
          <Route component={Rule} path="/info" />
        </Router>
      </>
    );
  }
}

export default App;
