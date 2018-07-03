import React, { Component } from 'react';
import {connect} from "react-redux";
import LocalizedStrings from 'react-localization';

class AllAlbums extends Component {
    render() {
        const strings = new LocalizedStrings({
            ru: {
                albums: 'Альбомы',
                total: 'всего'
            },
            kz: {
                albums: 'Альбомдар',
                total: 'барлығы'
            },
            en:{
                albums: 'Albums',
                total: 'total'
            }
        });
        strings.setLanguage(this.props.lang);
        return (
            <div className="all-albums-page">
                <section className="bg-lined full-view py-md-155 py-100">
                    <div className="container">
                        <div className="row mb-3">
                            <div className="col-12">
                                <h2>
                                    <span className="text-uppercase">
                                        {strings.albums}
                                    </span>
                                </h2>
                                <p className="big o-50 d-none d-md-block">
                                    {strings.total}: 4
                                </p>
                            </div>
                        </div>
                        <hr/>
                        <div className="row" style={{padding: '20px 0'}}>
                            <div className="col-md-4 mb-40" style={{minWidth: '300px'}}>
                                <div className="image-container" style={{maxWidth: '250px'}}>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/juz-entertainment-8c282.appspot.com/o/album_icon1.png?alt=media&token=266512b2-dc8d-4d46-9b99-79140cc684bd" alt=""/>
                                </div>
                                <h4>
                                    «QARANGY ZHARYQ»
                                </h4>
                                <p className="color-red">
                                    NINETY ONE (2017)
                                </p>
                            </div>
                            <div className="col-md-4 mb-40" style={{minWidth: '300px'}}>
                                <div className="image-container" style={{maxWidth: '250px'}}>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/juz-entertainment-8c282.appspot.com/o/album_icon2.png?alt=media&token=a52b1e38-ad74-401a-a90f-a9aec5d56ac8" alt=""/>
                                </div>
                                <h4>
                                    «QARANGY ZHARYQ»
                                </h4>
                                <p className="color-red">
                                    NINETY TWO (2017)
                                </p>
                            </div>
                            <div className="col-md-4 mb-40" style={{minWidth: '300px'}}>
                                <div className="image-container" style={{maxWidth: '250px'}}>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/juz-entertainment-8c282.appspot.com/o/album_icon3.png?alt=media&token=1b05c0aa-d6c9-49a1-ab0f-37d1b186c6f3" alt=""/>
                                </div>
                                <h4>
                                    «QARANGY ZHARYQ»
                                </h4>
                                <p className="color-red">
                                    ORDA (2017)
                                </p>
                            </div>
                            <div className="col-md-4 mb-40" style={{minWidth: '300px'}}>
                                <div className="image-container" style={{maxWidth: '250px'}}>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/juz-entertainment-8c282.appspot.com/o/album4.png?alt=media&token=51a3f003-e638-402b-b11a-ecc0f3be6799" alt=""/>
                                </div>
                                <h4>
                                    «ALEMCHIK»
                                </h4>
                                <p className="color-red">
                                    ORDA (2017)
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default connect(
    state => ({
        lang: state.languages
    })
)(AllAlbums);