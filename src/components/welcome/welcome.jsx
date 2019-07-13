import React, { Component } from "react";
import { Link } from "react-router-dom";
import MusicSvg from "./musicSvg";
import MuteSvg from "./muteSvg";
import OC from "../../img/20.png";
import GX from "../../img/wrapper-background.jpeg";
import styles from './welcome.module.css';

class Welcome extends Component {
  state = {
    sound: this.props.sound
  };

  changeVolume = () => {
    this.setState({
      sound: this.props.sound ? false : true
    });
    this.props.changeSound();
  };

  render() {
    return (
      <>
        <div className={styles.wellcomeWrapper}>




          {/* Header */}
          <div className={styles.titleBox}>

            {/* Sun*/}
            <div className={styles.sun}>
              <div className={styles.ray_box}>
                <div className={`${styles.ray} ${styles.ray1}`} ></div>
                <div className={`${styles.ray} ${styles.ray2}`} ></div>
                <div className={`${styles.ray} ${styles.ray3}`} ></div>
                <div className={`${styles.ray} ${styles.ray4}`} ></div>
                <div className={`${styles.ray} ${styles.ray5}`} ></div>
                <div className={`${styles.ray} ${styles.ray6}`} ></div>
                <div className={`${styles.ray} ${styles.ray7}`} ></div>
                <div className={`${styles.ray} ${styles.ray8}`} ></div>
                <div className={`${styles.ray} ${styles.ray9}`} ></div>
                <div className={`${styles.ray} ${styles.ray10}`} ></div>
              </div>
            </div>
            {/* Title */}
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>GAME TITLE</h1>

            </div>
          </div>

          {/* Footer */}
          <div className={styles.playBtnBox}>

            {/* PLay Button */}
            <div className={styles.startGame}>
              <div className={styles.playBtnWrap}>
                <span className={styles.playBtn} onClick={this.props.startGame}>
                  Play
            </span>
              </div>
            </div>

            {/* Sounds */}
            <div className={styles.soundsBox}>
              <div className={styles.soundsWrapper}>
                {this.state.sound ? (
                  <div className={styles.soundBtn} onClick={this.changeVolume}>
                    <MuteSvg />{" "}
                  </div>
                ) : (
                    <div className={styles.soundBtn} onClick={this.changeVolume}>
                      <MusicSvg />
                    </div>
                  )}
                {/* <button className={styles.soundBtn}>Music</button> */}
                {/* <button className={styles.soundBtn} onClick={this.changeVolume}>Sounds</button> */}
              </div>
            </div>
          </div>

        </div>
        {/* <div className="welcome-wraper">
          <div className="menu">
            <ul>
              <li>
                <span className="button" onClick={this.props.startGame}>
                  თამაში
                </span>
              </li>
              <li>
                <Link className="button" to="/ranking">
                  ლიდერები
                </Link>
              </li>
              <li>
                <Link className="button" to="/info">
                  წესები
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer">
            {this.state.sound ? (
              <div className="svg-box" onClick={this.changeVolume}>
                <MuteSvg />{" "}
              </div>
            ) : (
              <div className="svg-box" onClick={this.changeVolume}>
                <MusicSvg />
              </div>
            )}
            <button
              onClick={this.props.changeOccupation}
              style={{
                backgroundImage:
                  this.props.occupation == 0 ? `url('${GX}')` : `url('${OC}')`
              }}
              className="occupation-button"
            />
          </div>
        </div> */}
      </>
    );
  }
}

export default Welcome;
