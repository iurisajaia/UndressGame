import React, { Component } from "react";
import firebase from "../config/FirebaseConfig";
import { withRouter } from "react-router-dom";
import { validateInputs } from "../../validation/validation";

class SubmitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      number: "",
      score: 0,
      errors: {
        name: "",
        number: ""
      }
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: {
        ...this.state.errors,
        [e.target.name]: ""
      }
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    let user;
    validateInputs(this.state.name, this.state.number)
      .then(() => {
        user = this.props.users.find(x => {
          return Number(x.number) === Number(this.state.number);
        });

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
      })
      .catch(err => {
        console.log(err);
        err.inner.map(item => {
          this.setState({
            errors: {
              ...this.state.errors,
              [item.path]: item.message
            }
          });
        });
      });
  };
  render() {
    console.log(this.state.errors, "errors");
    return (
      <div className="text-center">
        <form onSubmit={this.handleSubmit}>
          <span className="your-score">{this.props.score * 100}</span>{" "}
          <input
            onChange={this.handleChange}
            name="name"
            type="text"
            placeholder="სახელი"
          />
          {this.state.errors.name && <span>{this.state.errors.name}</span>}
          <input
            onChange={this.handleChange}
            name="number"
            type="number"
            placeholder="ნომერი"
          />
          {this.state.errors.number && <span>{this.state.errors.number}</span>}
          <input type="hidden" name="score" value={this.props.score * 100} />
          <button type="submit" className="submit-form">
            გაგზავნა
          </button>
        </form>
        <button className="button play-again" onClick={this.props.startGame}>
          კიდევ სცადე
        </button>
      </div>
    );
  }
}

export default withRouter(SubmitForm);
