import React, { Component } from 'react';
import Player from "../playerComponent/player";
import PlayerPlaylist from "../playerPlaylistComponent/playerPlaylist";

import './playerList.css';

export default class PlayerList extends Component {

    render() {
        return (
            <div className="player-list">
                <Player/>
                <PlayerPlaylist/>
            </div>
        );
    }
}