import React, { Component } from 'react';

class Rank extends Component {
    state = {}
    render() {
        return (
            <ul className="ranking-list">
                <li className="ranking-list-item">
                    <div className="ranking-box">
                        <div className="rank">1.</div>
                        <div className="person">
                            <span className="name">John Doe</span>
                            <span className="point">15 000</span>
                        </div>
                    </div>
                </li>
            </ul>
        );
    }
}

export default Rank;