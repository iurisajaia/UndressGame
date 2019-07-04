import React, { Component } from "react";
import firebase from "../config/FirebaseConfig";

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
    console.log(this.props.users, "users");
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
  };
  render() {
    return (
      <div className="text-center">
        <form>
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
          <button onClick={this.handleSubmit}>გაგზავნა</button>
        </form>
        <button className="button" onClick={this.props.startGame}>
          კიდევ სცადე
        </button>
      </div>
    );
  }
}

export default SubmitForm;
