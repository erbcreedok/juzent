import React, { Component } from 'react';

import './playerPlaylist.css';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {playerNowPause, playerNowPlaySong} from "../../actions/player";
import EqualizerSvg from "../equalizerSvgComponent/equalizerSvg";
import badge from '../../assets/img/badge-black.png';
import badgeHover from '../../assets/img/badge-hover.png';
class PlayerPlaylist extends Component {

    getSongs() {
        let r = [];
        const songs = this.props.tracks;
        const playState = this.props.player.state.playing;
        const playingSong = this.props.player.song;
        if (!songs) return;

        else if (songs === 'LOADING') {
            [1,2,3,4,5,6,7].map((i) => {
                r.push(
                    <li key={i} className="playlist-song d-flex align-items-center">
                        <div className="song-number">
                            <span className="song-number-span"> {("0" + i).slice(-2)} </span>
                        </div>
                        <div className="song-info">
                            <div>
                                <span className="bg-gray-loading border-rounded d-inline-block" style={{height: '10px', width: '110px'}}/>
                                <br/>
                                <span className="bg-gray-loading border-rounded d-inline-block" style={{height: '10px', width: '20px'}}/>
                            </div>
                        </div>
                    </li>
                )
            })
        }

        else {
            songs.map((song, index) => {
                r.push(
                    <li key={index} className={'playlist-song d-flex align-items-center ' + ((playingSong && playingSong.id && song.id && playingSong.id === song.id) ? 'playing ' : ' ')} onClick={()=>{ (playingSong && playingSong.id && song.id===playingSong.id && playState) ? this.props.pauseSong() : this.props.playSong(song) }}>
                        {playingSong && playingSong.id && (playingSong.id === song.id && playState) ?
                            <div className="song-number">
                                <span className="icon-pause-full color-red song-play"/>
                                <EqualizerSvg className="song-status equalizer-animate"/>
                            </div>
                            :
                            playingSong && playingSong.id && playingSong.id === song.id ?
                            <div className="song-number">
                                <span className="icon-play-full color-red song-play"/>
                                <EqualizerSvg className="song-status"/>
                            </div> :
                            <div className="song-number">
                                <span className="icon-play-full color-red song-play"/>
                                <span className="song-number-span song-status"> {("0" + (index+1)).slice(-2)} </span>
                            </div>
                        }
                        <div className="song-info">
                            <div>
                                <span>{song.song_title}</span>
                                <br/>
                                <span>{song.song_duration}</span>
                            </div>
                        </div>
                        <div className="song-links ml-auto">
                            {song.song_link ?
                                <a href={song.song_link} className="song-link" target="_blank">
                                    <img className="original" src={badge} height="25px" alt=""/>
                                    <img className="hovered" src={badgeHover} height="25px" alt=""/>
                                </a>
                                : ''
                            }
                        </div>
                    </li>
                )
            });
        }


        return r;
    }

    render() {
        return (
            <ul className="player-playlist-container">
                {this.getSongs()}
            </ul>
        );
    }
}

export default withRouter(connect(
    state => ({
        tracks: state.tracks.tracks,
        player: state.playerNow
    }),
    dispatch => ({
        playSong: (song) => {
            dispatch(playerNowPlaySong(song));
        },
        pauseSong: () => {
            dispatch(playerNowPause())
        }
    })
)(PlayerPlaylist))