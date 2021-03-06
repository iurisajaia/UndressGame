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
      sound: true,
      template: 0,
      unsubscribe: null
    };
  }

  componentDidMount() {
    let unsubscribe;
    firebase
      .firestore()
      .collection("ranking")
      .onSnapshot(
        snapshot => {
          this.setState({
            users: snapshot.docs
              .map(doc => {
                return {
                  ...doc.data(),
                  id: doc.id
                };
              })
              .sort((user1, user2) => {
                return Number(user2.score) - Number(user1.score);
              })
          });
        },
        err => console.log(err)
      );
    this.setState({
      unsubscribe: unsubscribe
    });
  }
  componentWillUnmount() {
    this.state.unsubscribe();
  }
  changeSound = () => {
    this.setState({ sound: this.state.sound ? false : true });
  };
  render() {
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
                template={this.state.template}
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
