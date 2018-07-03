import React, { Component } from 'react';

export default class AllSongs extends Component {

    getSongs() {
        const songs = [
            {
                id: 1,
                title: 'AH! YAH! MAH!',
                artist: 'Ninety One',
                year: '2017',
                album: 'Qarangy Zharyq',
                duration: '04:03',
                cover: 'https://firebasestorage.googleapis.com/v0/b/juz-entertainment-8c282.appspot.com/o/song1.jpg?alt=media&token=d9022832-9b33-4c7f-9ccd-23de931a2c46'
            },
            {
                id: 2,
                title: 'MOOZ',
                artist: 'Ninety One',
                year: '2017',
                album: 'ASPAN ASHYQ',
                duration: '02:43',
                cover: 'https://firebasestorage.googleapis.com/v0/b/juz-entertainment-8c282.appspot.com/o/mooz-min.jpg?alt=media&token=f983e60f-1ec7-44b4-ac3e-4a386c5992a7'
            },
            {
                id: 3,
                title: 'LADIES.',
                artist: 'Q-Pop',
                year: '2018',
                album: 'ZHUREK',
                duration: '03:15',
                cover: 'https://firebasestorage.googleapis.com/v0/b/juz-entertainment-8c282.appspot.com/o/song3-min.jpg?alt=media&token=8b8d0278-1c03-4698-957a-7f4074ee4cd5'
            },
            {
                id: 4,
                title: 'AH! YAH! MAH!',
                artist: 'Ninety One',
                year: '2017',
                album: 'Qarangy Zharyq',
                duration: '04:03',
                cover: 'https://firebasestorage.googleapis.com/v0/b/juz-entertainment-8c282.appspot.com/o/song1.jpg?alt=media&token=d9022832-9b33-4c7f-9ccd-23de931a2c46'
            },
            {
                id: 5,
                title: 'MOOZ',
                artist: 'Ninety One',
                year: '2017',
                album: 'ASPAN ASHYQ',
                duration: '02:43',
                cover: 'https://firebasestorage.googleapis.com/v0/b/juz-entertainment-8c282.appspot.com/o/mooz-min.jpg?alt=media&token=f983e60f-1ec7-44b4-ac3e-4a386c5992a7'
            },
            {
                id: 6,
                title: 'LADIES.',
                artist: 'Q-Pop',
                year: '2018',
                album: 'ZHUREK',
                duration: '03:15',
                cover: 'https://firebasestorage.googleapis.com/v0/b/juz-entertainment-8c282.appspot.com/o/song3-min.jpg?alt=media&token=8b8d0278-1c03-4698-957a-7f4074ee4cd5'
            },
            {
                id: 7,
                title: 'AH! YAH! MAH!',
                artist: 'Ninety One',
                year: '2017',
                album: 'Qarangy Zharyq',
                duration: '04:03',
                cover: 'https://firebasestorage.googleapis.com/v0/b/juz-entertainment-8c282.appspot.com/o/song1.jpg?alt=media&token=d9022832-9b33-4c7f-9ccd-23de931a2c46'
            },
            {
                id: 8,
                title: 'MOOZ',
                artist: 'Ninety One',
                year: '2017',
                album: 'ASPAN ASHYQ',
                duration: '02:43',
                cover: 'https://firebasestorage.googleapis.com/v0/b/juz-entertainment-8c282.appspot.com/o/mooz-min.jpg?alt=media&token=f983e60f-1ec7-44b4-ac3e-4a386c5992a7'
            },
            {
                id: 9,
                title: 'LADIES.',
                artist: 'Q-Pop',
                year: '2018',
                album: 'ZHUREK',
                duration: '03:15',
                cover: 'https://firebasestorage.googleapis.com/v0/b/juz-entertainment-8c282.appspot.com/o/song3-min.jpg?alt=media&token=8b8d0278-1c03-4698-957a-7f4074ee4cd5'
            },
            {
                id: 10,
                title: 'AH! YAH! MAH!',
                artist: 'Ninety One',
                year: '2017',
                album: 'Qarangy Zharyq',
                duration: '04:03',
                cover: 'https://firebasestorage.googleapis.com/v0/b/juz-entertainment-8c282.appspot.com/o/song1.jpg?alt=media&token=d9022832-9b33-4c7f-9ccd-23de931a2c46'
            }
        ];
        let r = [];
        songs.map( (song, index) => {
            r.push(
                <li key={index} className="row flex-nowrap playlist-song song-item align-items-center px-0">
                    <div className="col-1">
                        <div className="song-number ml-auto">
                            <span className="o-25 big"> {("0" + (index + 1)).slice(-2)} </span>
                        </div>
                    </div>
                    <div className="col-1">
                        <div className="image-small image-shadow image-container image-rounded mr-4" style={{height: '50px', width: '50px'}}>
                            <img src={song.cover} alt=""/>
                            <img className="blured" src={song.cover} alt=""/>
                        </div>
                    </div>
                    <div className="col-3">
                        <p className="font-weight-bold mb-0">
                            {song.title}
                        </p>
                    </div>
                    <div className="col-3">
                        <a className="normal red-href" href="#">
                            {song.artist} {song.year ? '(' + song.year + ')' : ''}
                        </a>
                    </div>
                    <div className="col-2">
                        <a className="normal red-href" href="#">
                            {song.album}
                        </a>
                    </div>
                    <div className="col-2">
                        <span>
                            {song.duration}
                        </span>
                    </div>
                </li>
            )
        });
        return r;
    }

    render() {
        return (
            <div className="all-songs-page">
                <section className="bg-lined full-view py-md-155 py-100">
                    <div className="container">
                        <div className="row mb-3">
                            <div className="col-12">
                                <h2>
                                    <span className="text-uppercase">
                                        Песни
                                    </span>
                                </h2>
                                <p className="big o-50 d-none d-md-block">
                                    Всего песен: 10
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="playlist-wrapper" style={{overflowX: 'auto'}}>
                        <div className="playlist-header bg-gray" style={{minWidth: '720px'}}>
                            <div className="container" >
                                <div className="row flex-nowrap py-3">
                                    <div className="col-1"/>
                                    <div className="col-1"/>
                                    <div className="col-3">
                                        <span className="text-uppercase o-50 small">
                                            Название
                                        </span>
                                    </div>
                                    <div className="col-3">
                                        <span className="text-uppercase o-50 small">
                                            Исполнитель
                                        </span>
                                    </div>
                                    <div className="col-2">
                                        <span className="text-uppercase o-50 small">
                                            Альбом
                                        </span>
                                    </div>
                                    <div className="col-2">
                                        <span className="text-uppercase o-50 small">
                                            Время
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="playlist-body" style={{minWidth: '720px'}}>
                            <div className="container bg-white">
                                <ul className="player-playlist-container" style={{maxHeight: '710px'}}>
                                    {this.getSongs()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}