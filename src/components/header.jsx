import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    state = {}
    render() {
        return (
            <ul className="game-header">
                <li><Link to="/">Game</Link></li>
                <li><Link to="/ranking">Ranking</Link></li>
                <li><Link to="/info">Rules</Link></li>
            </ul>
        );
    }
}

export default Header;