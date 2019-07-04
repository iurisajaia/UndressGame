import React, { Component } from "react";
import firebase from "../config/FirebaseConfig";
import { withRouter } from "react-router-dom";

class SubmitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      number: "",
      score: ""
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    let user;
    if (this.props.users) {
      user = this.props.users.find(x => {
        return Number(x.number) === Number(this.state.number);
      });
    }

    if (user) {
      firebase
        .firestore()
        .collection("ranking")
        .doc(user.id)
        .set({
          name: this.state.name,
          number: this.state.number,
          score:
            user.score > this.props.score * 100
              ? user.score
              : this.props.score * 100
        })
        .catch(err => console.log(err));
    } else {
      firebase
        .firestore()
        .collection("ranking")
        .add({
          name: this.state.name,
          number: this.state.number,
          score: this.props.score * 100
        })
        .then(res => {
          console.log(res, "response");
        });
    }

    this.props.history.push("/ranking");
  };
  render() {
    return (
      <div className="text-center">
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            name="name"
            type="text"
            placeholder="სახელი"
          />
          <br />
          <input
            onChange={this.handleChange}
            name="number"
            type="text"
            placeholder="ნომერი"
          />{" "}
          <br />
          <input type="hidden" name="score" value={this.props.score * 100} />
          <span className="your-score">
            შენი ქულა : {this.props.score * 100}
          </span>{" "}
          <br />
          <button type="submit">გაგზავნა</button>
        </form>
        <button className="button" onClick={this.props.startGame}>
          კიდევ სცადე
        </button>
      </div>
    );
  }
}

export default withRouter(SubmitForm);
