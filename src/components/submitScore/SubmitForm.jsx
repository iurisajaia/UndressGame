import React, { Component } from "react";
import firebase from "../config/FirebaseConfig";
import { withRouter } from "react-router-dom";
import { validateInputs } from "../../validation/validation";
import HouseSvg from "../game/houseSvg";

class SubmitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: localStorage.getItem("name") || "",
      number: localStorage.getItem("number") || "",
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
            .then(() => {
              localStorage.setItem("name", this.state.name);
              localStorage.setItem("number", this.state.number);
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
              localStorage.setItem("name", this.state.name);
              localStorage.setItem("number", this.state.number);
            });
        }

        this.props.history.push("/ranking");
      })
      .catch(err => {
        err.inner.map(item => {
          this.setState({
            errors: {
              ...this.state.errors,
              [item.path]: item.message
            }
          });
          return 1;
        });
      });
  };
  render() {
    return (
      <div className="text-center">
        <form onSubmit={this.handleSubmit}>
          <span className="your-score">{this.props.score * 100}</span>{" "}
          <input
            onChange={this.handleChange}
            name="name"
            type="text"
            value={this.state.name}
            placeholder="სახელი"
          />
          {this.state.errors.name && <span>{this.state.errors.name}</span>}
          <input
            onChange={this.handleChange}
            name="number"
            type="number"
            value={this.state.number}
            placeholder="ნომერი"
          />
          {this.state.errors.number && <span>{this.state.errors.number}</span>}
          <input type="hidden" name="score" value={this.props.score * 100} />
          <button type="submit" className="submit-form">
            გაგზავნა
          </button>
        </form>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button className="button play-again" onClick={this.props.startGame}>
            კიდევ სცადე
          </button>
          <button className="button play-again" onClick={this.props.stopGame}>
            <HouseSvg />
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(SubmitForm);
