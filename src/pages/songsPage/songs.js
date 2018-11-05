import React, { Component } from 'react';
import PlayerList from "../../components/playerListComponent/playerList";
import { Button } from 'reactstrap';
import {Link, withRouter} from "react-router-dom";
import LocalizedStrings from 'react-localization';
import './songs.css';
import VideoBlock from "../../components/videoBlockComponent/videoBlock";
import {connect} from "react-redux";
import {getAlbum, getAlbums} from "../../actions/albums";
import {playerNowPlaySong, playerNowSetSong} from "../../actions/player";
import AlbumCoverImage from "../../components/AlbumCoverImageComponent/albumCoverImage";
import {getMainVideos} from "../../actions/videos";

class Songs extends Component {

    componentWillReceiveProps(props) {
        if (this.props.match.params.albumId !== props.match.params.albumId) {
            this.props.getAlbum(props.match.params.albumId);
        }

        if ((!this.props.tracks.tracks || this.props.tracks.tracks==='LOADING') && (props.tracks.tracks && props.tracks.tracks!=='LOADING' && props.tracks.tracks.length>0) && !this.props.player.song) {
            this.props.setSong(props.tracks.tracks[0]);
        }
    }

    componentWillMount() {
        if (!this.props.tracks.album || this.props.match.params.albumId !== this.props.tracks.album.id) {
            if (this.props.match.params.albumId) {
                this.props.getAlbum(this.props.match.params.albumId)
            } else {
                this.props.getAlbum('1530701456615');
            }
        }
        if (!this.props.albums) {
            this.props.getAlbums();
        }
        this.props.getVideos();
    }

    render() {
        const strings = new LocalizedStrings({
            ru: {
                all: 'Воспроизвести все',
                songCount: '{0} песен',
                songs: 'Популярные песни',
                albums: 'Популярные альбомы',
                clips: 'Популярные клипы',
                allClips: 'Все клипы',
                allAlbums: 'Все альбомы',
            },
            kz: {
                all: 'Бәрін ойнату',
                songCount: '{0} әуен',
                songs: 'Әуендер',
                albums: 'Альбомдар',
                clips: 'Бейнебаяндар',
                allClips: 'Барлық бейнебаяндар',
                allAlbums: 'Барлық альбомдар',
            },
            en:{
                all: 'Play all',
                songCount: '{0} songs',
                songs: 'Popular songs',
                albums: 'Popular albums',
                clips: 'Popular videos',
                allClips: 'All videos',
                allAlbums: 'All albums',
            }
        });
        strings.setLanguage(this.props.lang);
        const selectedAlbum = this.props.tracks.album;
        const tracks = this.props.tracks.tracks;
        const albums = this.props.albums;
        const videos = this.props.videos;

        const renderSelectedAlbum = () => {
            if (!selectedAlbum) return;
            if ( selectedAlbum === 'LOADING') return (
                <div className="col-lg-5">
                    <div className="song-avatar mx-auto ml-md-0" style={{maxWidth: '400px', position: 'relative'}}>
                        <div className="image-container image-rounded image-shadow mb-20 bg-gray-loading" style={{maxWidth: '100%', paddingBottom: '100%', height: '0'}}>
                        </div>
                    </div>
                    <div className="row mx-0" style={{maxWidth: '400px'}}>
                        <div className="mr-auto mb-20">
                            <h4 className="bg-gray-loading border-rounded mb-3" style={{height: '24px', width: '300px'}}/>
                            <p className="bg-gray-loading border-rounded" style={{height: '20px', width: '200px'}}/>
                        </div>
                    </div>
                </div>
            );
            return (
                <div className="col-lg-5">
                    <div className="song-avatar mx-auto ml-md-0" style={{maxWidth: '400px', position: 'relative'}}>
                        <div className="image-container image-rounded image-shadow mb-20" style={{maxWidth: '100%', paddingBottom: '100%', height: '0', background:'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)'}}>
                            <img style={{position: 'absolute', top: '0', left: '0'}} src={selectedAlbum.album_cover} alt=""/>
                        </div>
                    </div>
                    <div className="row mx-0" style={{maxWidth: '400px'}}>
                        <div className="mr-auto mb-20">
                            <h4>
                                <span className="text-uppercase">
                                    «{selectedAlbum.album_title}»
                                </span>
                            </h4>
                            <p className="color-red">
                                <span className="text-uppercase">
                                    {selectedAlbum.album_artist} ({selectedAlbum.album_year})
                                </span>
                            </p>
                        </div>
                        { (tracks && tracks!=='LOADING' && tracks.length > 0) ? (
                            <div className="ml-auto text-right">
                                <button className="btn btn-light btn-small btn-shadow mb-2" onClick={() => {this.props.playAll(tracks[0])}}>
                                    <span className="icon-play"/> <span className="text-uppercase">{strings.all}</span>
                                </button>
                                <p className="normal o-50 d-none d-md-block">
                                    {strings.formatString(strings.songCount, tracks.length)}
                                </p>
                            </div> ) : ''
                        }
                    </div>
                </div>
            )
        };

        const getAlbums = () => {
            if (!albums) return;
            if (albums==='LOADING') return;
            let r = [];
            albums.map((album) => {
                r.push((
                    <div className="col-md-4" style={{minWidth: '300px'}} key={album.id}>
                        <Link to={'/songs/' + album.id} onClick={() => {window.scrollTo(0,0);}} className="a-inherit no-underline-hover">
                            <div className="image-container" style={{maxWidth: '250px'}}>
                                <AlbumCoverImage src={album.album_cover} alternateSrc={album.album_alternate_cover} />
                            </div>
                            <h4>
                               <span className="text-uppercase">
                               «{album.album_title}»
                               </span>
                            </h4>
                            <p className="color-red">
                               <span className="text-uppercase">
                               {album.album_artist} ({album.album_year})
                               </span>
                            </p>
                        </Link>
                    </div>
                ))
            });
            return r;
        };

        const getVideos = () => {
            if (!this.props.videos || this.props.videos === 'LOADING') return;
            let r = [];
            this.props.videos.map((video, index) => {
                const date = new Date(video.video_date);
                const dateDOM = isNaN(date.getTime()) ? video.video_date : ('' + ("0" + date.getDate()).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear());
                r.push(
                    <div className="col-md-4 mb-5" key={index}>
                        <VideoBlock title={video.video_title} src={video.video_link} date={dateDOM} img="https://i.ytimg.com/vi/Ooss5vbMaIE/maxresdefault.jpg" />
                    </div>
                )
            });
            return r;
        };

        return (
            <div className="songs-page">
                <section className="bg-gray bg-lined full-view py-md-155 py-100">
                    <div className="container">
                        <div className="row mb-50">
                            <div className="col-12">
                                <h2>
                                    <span className="text-uppercase">
                                        {strings.songs}
                                    </span>
                                </h2>
                            </div>
                        </div>
                        <div className="row">
                            { renderSelectedAlbum() }
                            <div className="col-lg-7">
                                <PlayerList/>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-lined py-70">
                    <div className="container">
                        <div className="row mb-40">
                            <div className="col-12 d-flex">
                                <h2 className="text-uppercase">{strings.albums}</h2>
                                {
                                    (albums && albums !== 'LOADING' && albums.length > 3) ?
                                        <Link to={'/allAlbums'}  className="ml-auto">
                                            <Button color="primary">
                                                <span className="text-uppercase">
                                                    {strings.allAlbums}
                                                </span>
                                            </Button>
                                        </Link>
                                        : ''
                                }
                            </div>
                        </div>
                        <div className="row flex-nowrap" style={{overflowX: 'auto', padding: '20px 0'}}>
                            {getAlbums()}
                        </div>
                        <div className="mb-70"/>
                        <div className="row mb-40">
                            <div className="col-12 d-flex">
                                <h2 className="text-uppercase">{strings.clips}</h2>
                                <Link to={'/allVideos'} className="ml-auto">
                                    <Button color="primary">
                                        <span className="text-uppercase">
                                            {strings.allClips}
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            { getVideos() }
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}

export default withRouter(connect(
    state => ({
        lang: state.languages,
        tracks: state.tracks,
        albums: state.albums,
        videos: state.videos,
        player: state.playerNow
    }),
    dispatch => ({
        getAlbums: () => {
            dispatch(getAlbums());
        },
        getAlbum: (albumID) => {
            dispatch(getAlbum(albumID));
        },
        playAll: (song) => {
            dispatch(playerNowPlaySong(song));
        },
        setSong: (song) => {
            dispatch(playerNowSetSong(song));
        },
        getVideos: () => {
            dispatch(getMainVideos())
        }
    })
)(Songs))