import React, { Component } from 'react';
import {connect} from "react-redux";
import {playerNowPause, playerNowPlaySong, setCurrentTime, setDuration} from "../../actions/player";
import {Modal, ModalBody} from "reactstrap";
import badge from '../../assets/img/badge-black.png';
import './audioGlobal.css';
import LocalizedStrings from 'react-localization';


class AudioGlobal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            finishedSong: null
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.controlModal = this.controlModal.bind(this);
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    controlModal(open) {
        this.setState({
            modal: open
        })
    }

    audio = new Audio;


    componentWillReceiveProps(props) {
        if (Math.abs(this.props.state.currentTime - props.state.currentTime) > 1) {
            this.audio.currentTime = props.state.currentTime;
        }

        if (this.audio.src !== (props.song && props.song.song_file ? props.song.song_file : '')) {
            this.audio.pause();
            this.audio.src = props.song && props.song.song_file ? props.song.song_file : '';
        }
        if (props.song && props.song.song_file && props.state.playing) {
            const playPromise = this.audio.play();
            playPromise.then(_ => {
                if (!props.song || !props.song.song_file || !props.state.playing) {
                    this.audio.pause();
                }
            }).catch(error => {
            });
        } else if (props.song && props.song.song_file && !props.state.playing){
            this.audio.pause();
        }
    }

    componentDidMount() {
        this.audio.onloadedmetadata = () => {
            this.props.setDuration(this.audio.duration);
        };

        this.audio.ontimeupdate = () => {
            this.props.setCurrentTime(this.audio.currentTime);
        };
        this.audio.onended = () => {
            this.props.pausePlayer();
            this.audio.pause();
            this.controlModal(true);
            this.setState({
                finishedSong: this.props.song
            });
            setTimeout(() => {
                if (this.props.song && this.props.song.song_file) {
                    const index = this.props.tracks.findIndex((track) => track === this.props.song);
                    const nextSong = this.props.tracks[index+1];
                    this.props.nextSong(nextSong);
                }
            }, 5000 );
        };
        this.audio.onpause = () => {
            console.log('pause');
            this.audio.pause();
            this.props.pausePlayer();
        };
        this.audio.onplay = () => {
            console.log('play');
        }
    }

    render() {
        const strings = new LocalizedStrings({
            ru: {
                liked: 'Понравилась песня?',
                listen: 'Слушайте песню на iTunes и Apple Music'
            },
            kz: {
                liked: 'Әуен ұнады ма?',
                listen: 'Әуенді iTunes-те және Apple Music-те тыңдаңыз'
            },
            en:{
                liked: 'Liked this song?',
                listen: 'Listen this song on iTunes and Apple Music'
            }
        });
        strings.setLanguage(this.props.lang);
        return (
            <div className="audio-element">
                <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="listen-more-modal">
                    <span className="icon-close" onClick={this.toggleModal}/>
                    <ModalBody style={{padding: '30px 50px', borderRadius: '10px'}}>
                        <h2 className="mb-5">{strings.liked}</h2>
                        <p className="o-75">{strings.listen}</p>
                        <a href={this.state.finishedSong && this.state.finishedSong.song_link} target="_blank">
                            <img src={badge} alt="" height="30px"/>
                        </a>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default connect(
    state => ({
        lang: state.languages,
        tracks: state.tracks.tracks,
        song: state.playerNow.song,
        state: state.playerNow.state
    }),
    dispatch => ({
        setCurrentTime: (time) => { dispatch(setCurrentTime(time) ) },
        setDuration: (time) => { dispatch(setDuration(time) ) },
        nextSong: (song) => {
            dispatch(playerNowPlaySong(song));
        },
        pausePlayer: () => {
            dispatch(playerNowPause());
        }
    })
)(AudioGlobal);