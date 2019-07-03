import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Game from "./components/game/game";
import Ranking from "./components/ranking/rank";
import Rule from "./components/rules/rule";
import "./App.css";

import firebaseConfig from "./components/config/FirebaseConfig";
import Firebase from "firebase";

class App extends Component {
  constructor(props) {
    super(props);
    Firebase.initializeApp(firebaseConfig);
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    const db = Firebase.firestore();
    db.collection("ranking").onSnapshot(
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
  render() {
    console.log(this.state.users);
    return (
      <>
        <Router>
          <Route
            render={props => <Game {...props} users={this.state.users} />}
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
