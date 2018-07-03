import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import './player.css';
import songCoverDefault from '../../assets/img/song-cover-default.jpg';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {playerNowPause, playerNowPlay, playerNowPlaySong, setCurrentTime} from "../../actions/player";
import moment from "moment";

class Player extends Component {
    render() {
        const song = this.props.song;
        const state = this.props.state;
        const tracks = this.props.tracks;
        const index = (tracks && tracks!=='LOADING' &&tracks.length > 0) ? tracks.findIndex((track) => track === song) : -1;
        const nextSong = () => {
            if (index >= tracks.length - 1) return;
            const song = tracks[(index + 1) % tracks.length];
            this.props.setSongPlay(song);
        };
        const prevSong = () => {
            if (index <= 0) return;
            const song = tracks[index-1];
            this.props.setSongPlay(song);
        };

        return (
            <div className="player-container">
                <div className="d-flex">
                    <div className="player-image ">
                        <div className="image-small image-shadow image-container image-rounded" style={{height: '70px', width: '70px', background:'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)'}}>
                            { song && song.song_cover ? (<img src={song.song_cover} alt=""/>) : <img src={songCoverDefault} alt=""/> }
                        </div>
                    </div>
                    <div className="w-100">
                        <div className="d-flex px-3 pt-3">
                            <p className="player-controls mr-4 mb-0" disabled={!song}>
                                <span className="icon-backward-hover-full mx-2" disabled={index <= 0} onClick={prevSong}/>
                                { state.playing ? <span className="icon-pause-hover-full mx-2" onClick={this.props.pauseSong}/> : <span className="icon-play-hover-full mx-2" onClick={this.props.playSong}/>}
                                <span className="icon-forward-hover-full mx-2" disabled={tracks && tracks!=='LOADING' && index >= tracks.length-1} onClick={nextSong}/>
                            </p>
                            <p className="player-title mr-4 mb-0" style={{maxWidth: '360px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                <span className="font-weight-bold d-inline-block mr-2">{ song && song.song_title ? song.song_title : '----' }</span><span className="d-block d-md-inline-block">{song && song.song_artist ? song.song_artist : ''} {song && song.song_year ? '('+song.song_year+')' : ''}</span>
                            </p>
                        </div>
                        <div className="d-flex px-3 pt-3">
                            <span className="font-10 o-75 mr-2">
                                {state && state.currentTime
                                    ? moment(state.currentTime*1000 + 1).format('mm:ss')
                                    : '00:00'
                                }
                            </span>
                            <div className="progress-line-container w-100">
                                <Slider min={0} max={state.duration} tooltip={false} value={state.currentTime} step={1} onChange={this.props.setPlayerTime}/>
                            </div>
                            <span className="font-10 o-75 ml-2">{ song && song.song_duration && state && state.duration ? moment(state.duration*1000 + 1).format('mm:ss') : '00:00' }</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(
    state => ({
        state: state.playerNow.state,
        song: state.playerNow.song,
        tracks: state.tracks.tracks
    }),
    dispatch => ({
        playSong: () => {
            dispatch(playerNowPlay());
        },
        pauseSong: () => {
            dispatch(playerNowPause());
        },
        setSongPlay: (song) => {
            dispatch(playerNowPlaySong(song));
        },
        setPlayerTime: (time) => {
            dispatch(setCurrentTime(time));
        }
    })
)(Player))
