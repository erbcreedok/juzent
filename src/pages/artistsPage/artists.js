import React, { Component } from 'react';
import Slider from "react-slick";
import LocalizedStrings from 'react-localization';
import './artists.css';
import SocialLinks from "../../components/socialLinksComponent/socialLinks";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Modal, ModalBody} from "reactstrap";
import {getArtist, getArtists} from "../../actions/artists";

class Artists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalImg: ''
        };

        this.toggle = this.toggle.bind(this);

        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
    }

    toggle(src = '') {
        this.setState({
            modalImg: src,
            modal: !this.state.modal
        });
    }

    next() {
        this.gallerySlider.slickNext();
    }
    prev() {
        this.gallerySlider.slickPrev();
    }


    componentWillReceiveProps(props) {
        if (this.props.match.params.id !== props.match.params.id || this.props.lang !== props.lang) {
            this.props.unsetArtist();
            this.props.willMount(props.match.params.id, props.lang);
        }
        if (this.props.match.params.artistId !== props.match.params.artistId || this.props.lang !== props.lang) {
            this.props.setArtist(props.match.params.artistId, props.lang);
        }
        if (props.artists.artists && props.artists.artists[0] && !props.match.params.artistId && props.artists.artists && props.artists.artists!=='LOADING') {
            if (this.props.artists.group.artists.findIndex((artist) => ('' + artist ) === props.artists.artists[0].artist_id) !== -1) {
                this.props.history.push('/artists/' + props.match.params.id + '/' + props.artists.artists[0].artist_id);
            } else {
                this.props.unsetArtist();
            }
        }
    }
    componentWillMount() {
        this.props.willMount(this.props.match.params.id, this.props.lang);
        this.props.artists.selectedArtist = undefined;
    }
    componentDidMount() {
        this.props.onMount();
        if (this.props.match.params.artistId) {
            this.props.setArtist(this.props.match.params.artistId, this.props.lang);
        }
    }
    componentWillUnmount() {
        this.props.onUnmount();
    }

    render() {
        const strings = new LocalizedStrings({
            ru: {
                error: 'Ошибка',
                notFound: 'Данной страницы не существует',
                back: 'Назад',
                artists: 'Артисты {0}',
                photo: 'Фотографии артиста',
                phTotal: 'фото',
            },
            kz: {
                error: 'Қәте',
                notFound: 'Бет табылмады',
                back: 'Артка',
                artists: '{0} әртістері',
                photo: 'Әртісттің бейнесуреттері',
                phTotal: 'бейнесурет',
            },
            en:{
                error: 'Error',
                notFound: 'Page not found',
                back: 'Back',
                artists: 'Artists of {0}',
                photo: 'Artist\'s Photos',
                phTotal: 'photos',
            }
        });
        strings.setLanguage(this.props.lang);
        const artists = this.props.artists.artists && this.props.artists.artists[0] ? this.props.artists.artists : undefined;
        const group = this.props.artists.group;
        const selectedArtist = (this.props.artists.selectedArtist === 'LOADING' || group && this.props.artists.selectedArtist && this.props.artists.selectedArtist.artist_id && group.artists && group.artists.findIndex( artist => '' + artist === this.props.artists.selectedArtist.artist_id) !== -1 ) ? this.props.artists.selectedArtist : null;
        const settings = {
            infinite: true,
            centerMode: true,
            slidesToShow: 3,
            centerPadding: '0',
            slidesToScroll: 1,
            vertical: true,
            verticalSwiping: true,
            focusOnSelect: true,
            afterChange: (index) => {
                if (artists && artists!=='LOADING' && artists[index] && this.props.match.params.artistId !== artists[index].artist_id) {
                    this.props.history.push('/artists/' + this.props.match.params.id + '/' + artists[index].artist_id);
                }
            },

            onInit: () => {
                if (artists && artists!=='LOADING' && artists[0] && this.props.match.params.artistId !== artists[0].artist_id) {
                    this.props.history.push('/artists/' + this.props.match.params.id + '/' + artists[0].artist_id);
                }
            },
            responsive: [
                {
                    breakpoint:  992,
                    settings: {
                        vertical: false,
                        verticalSwiping: false,
                        centerMode: true,
                        variableWidth: true,
                        centerPadding: '25px',
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint:  768,
                    settings: {
                        vertical: false,
                        verticalSwiping: false,
                        centerMode: true,
                        variableWidth: true,
                        centerPadding: '20px',
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint:  576,
                    settings: {
                        vertical: false,
                        verticalSwiping: false,
                        centerMode: true,
                        variableWidth: true,
                        centerPadding: '15px',
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint:  360,
                    settings: {
                        vertical: false,
                        verticalSwiping: false,
                        centerMode: true,
                        variableWidth: true,
                        centerPadding: '5px',
                        slidesToShow: 1,
                    }
                }
            ]
        };
        const gallerySlider = {
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
        };

        const getArtists = () => {
            if (!artists) return;
            let rows = [];
            if (artists === 'LOADING') {
                [1,2,3,4,5].map((i) => {
                    rows.push(
                        <div key={i}>
                            <div className="artist-item d-block d-lg-flex bg-gray-loading">
                                <div className="artist-photo">
                                    <div className="image-container image-circle mr-lg-4">
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                });
            }
            else {
                let artistDOM = artists;
                while (artistDOM.length < 4 || artistDOM.length === 0) {
                    artistDOM = artistDOM.concat(artists);
                    console.log(artistDOM);
                }
                artistDOM.map((artist, index) => {
                    rows.push(
                        <div key={index}>
                            <div className="artist-item d-block d-lg-flex">
                                <div className="artist-photo">
                                    <div className="image-container image-circle mr-lg-4 bg-gray-loading"
                                         title={artist.artist_name}>
                                        <img src={artist.artist_gray_avatar} alt=""/>
                                    </div>
                                </div>
                                <div className="artist-info mt-4">
                                    <h3 className="big">
                                        {artist.artist_name}
                                    </h3>
                                    <p className="">
                                        { artist.artist_short_description }
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                });
            }
            return (
                <Slider ref={slider => (this.slider = slider)} {...settings} className="artists-list">
                    { rows }
                </Slider>
            );
        };
        const getGroup = () => {
            if (!group) {
                return (
                    <div>
                        <h2>{strings.error}</h2>
                        <h4>{strings.notFound}</h4>
                        <Link to={'/artists'}>{strings.back}</Link>
                    </div>
                );
            }
            if (group === 'LOADING') {
                return (
                    <div>
                        <div className="mb-4 bg-gray-loading border-rounded" style={{width: '100%', height: '47px'}}/>
                        <p className="bg-gray-loading border-rounded" style={{maxWidth: '348px', height: '21px'}}/>
                        <p className="bg-gray-loading border-rounded" style={{maxWidth: '320px', height: '21px'}}/>
                        <p className="bg-gray-loading border-rounded" style={{maxWidth: '148px', height: '21px'}}/>
                    </div>
                )
            } else {
                return (
                    <div>
                        <h1 className="mb-4">
                            <span className="text-uppercase">
                                {strings.formatString(strings.artists ? strings.artists : '', group.group_name ? group.group_name : '')}
                            </span>
                        </h1>
                        <p className="big" style={{maxWidth: '348px'}} dangerouslySetInnerHTML={{__html: group.group_description}}/>
                    </div>
                )
            }
        };
        const getArtist = () => {
            if (!selectedArtist) return;
            else if (selectedArtist === 'LOADING') {
                return (
                    <div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="image-container minify-image bg-gray-loading border-rounded" style={{width: '100%', height: '450px'}}>
                                    </div>
                                </div>
                                <div className="col-md-7 py-5">
                                    <h3 className="bg-gray-loading border-rounded mb-5" style={{height: '31px'}}/>
                                    <p className="bg-gray-loading border-rounded mb-20" style={{maxWidth: '90%', height: '21px'}}/>
                                    <p className="bg-gray-loading border-rounded mb-20" style={{maxWidth: '75%', height: '21px'}}/>
                                    <p className="bg-gray-loading border-rounded mb-20" style={{maxWidth: '40%', height: '21px'}}/>

                                </div>
                            </div>
                        </div>
                        <div className="bg-gray my-50  py-5">
                            <div className="container">
                                <h3 className="bg-gray-loading border-rounded" style={{height: '31px'}}/>
                                <br/>
                                <p className="bg-gray-loading border-rounded mb-20" style={{maxWidth: '90%', height: '21px'}}/>
                                <p className="bg-gray-loading border-rounded mb-20" style={{maxWidth: '75%', height: '21px'}}/>
                                <p className="bg-gray-loading border-rounded mb-20" style={{maxWidth: '40%', height: '21px'}}/>
                                <br/>
                                <br/>
                            </div>
                        </div>
                    </div>
                )
            } else {
                const getPhotos = () => {
                    let photos = [];
                    const images = selectedArtist.artist_images;
                    const isSlideable = images.length > 3;
                    images.map((image, index) => {
                        photos.push(
                            <div className={isSlideable ? 'col-12' : 'col-3'} key={index}>
                                <div className="image-container image-square minify-image bg-gray-loading position-relative" onClick={ () => { this.toggle(image) }}>
                                    <div style={{backgroundImage: `url(${image})`, height: '100%', width: '100%'}} className="bg-image bg-image-cover"/>
                                </div>
                            </div>
                        )
                    });
                    if (isSlideable) {
                        return <Slider ref={c => (this.gallerySlider = c)} {...gallerySlider} className="row"> {photos} </Slider>;
                    } else {
                        return <div className="row">{photos}</div>;
                    }
                };
                return (
                    <div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="image-container minify-image bg-gray-loading" style={{width: '100%', height: '450px'}}>
                                        <div className="bg-image-cover" style={{backgroundImage: `url(${selectedArtist.artist_avatar})`, height: '100%', width: '100%', backgroundPosition: 'top'}}/>
                                    </div>
                                </div>
                                <div className="col-md-7 py-5">
                                    <h3>{selectedArtist.artist_name}</h3>
                                    <p className="mb-20">{selectedArtist.artist_short_description}</p>
                                    {selectedArtist.artist_socials ? (<SocialLinks
                                        mail={selectedArtist.artist_socials.mail}
                                        facebook={selectedArtist.artist_socials.facebook}
                                        instagram={selectedArtist.artist_socials.instagram}
                                        twitter={selectedArtist.artist_socials.twitter}
                                        youtube={selectedArtist.artist_socials.youtube}
                                        dark
                                    />) : ''
                                    }
                                    {
                                        selectedArtist.artist_images ? (
                                            <div>
                                                <div className="row mt-50 mx-0 mb-3">
                                                    <h4>
                                                        <span className="text-uppercase">
                                                            {strings.photo}
                                                        </span>
                                                    </h4>
                                                    {selectedArtist.artist_images.length > 3 ?
                                                        <div className="ml-auto d-flex align-items-center">
                                                            <span onClick={this.prev} className="font-24 d-inline-block mr-3 icon-arrow-circle-hover-full-left" style={{cursor: 'pointer'}}/>
                                                            {selectedArtist.artist_images.length} {strings.phTotal}
                                                            <span onClick={this.next} className="font-24 d-inline-block ml-3 icon-arrow-circle-hover-full-right" style={{cursor: 'pointer'}}/>
                                                        </div> : '' }
                                                </div>
                                                {getPhotos()}
                                            </div>
                                        ) : ''
                                    }

                                </div>
                            </div>
                        </div>
                        {
                            selectedArtist.artist_biography ? (
                                <div className="bg-gray my-50  py-5">
                                    <div className="container" dangerouslySetInnerHTML={{__html: selectedArtist.artist_biography}}/>
                                </div>
                            ) : ''
                        }
                    </div>
                )
            }
        };
        const groupName = !group || group === 'LOADING' || !group.group_name ? '' :  group.group_name.toUpperCase();
        const svgMarkup = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1163 146" width="1163px" height="146px"><text transform="translate(0 146)" opacity="0.04" fill="#000000" font-size="200px" font-family="PT Sans" font-weight="bold" letter-spacing="1">${groupName}</text></svg>`).replace('(','%28').replace(')','%29');
        const uri = `url(data:image/svg+xml;utf8,${svgMarkup}`;

        if (artists && artists!=='LOADING' && this.slider) {
            if (this.props.match.params.artistId) {
                const ind = artists.findIndex(artist => '' + artist.artist_id === this.props.match.params.artistId);
                if (ind >= 0) this.slider.slickGoTo(artists.findIndex(artist => artist.artist_id === this.props.match.params.artistId));
            } else {
                this.slider.slickGoTo(0);
            }

        }

        return (
            <div className="artists-page" >
                <section className="bg-lined">
                    <div className="artists-bg-image" style={{backgroundImage: uri}}/>
                    <div className="container" >
                        <div className="row align-items-center pt-lg-150 pb-lg-70">
                            <div className="col-lg-5 artists-jumbotron">
                                {getGroup()}
                            </div>
                            <div className="col-lg-7">
                                {getArtists()}
                            </div>
                        </div>
                    </div>
                    { getArtist() }
                </section>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <span className="icon-close" onClick={this.toggle}/>
                    <ModalBody>
                        <img width="100%" src={this.state.modalImg} alt=""/>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}


export default withRouter(connect(
    state => ({
        lang: state.languages,
        header: state.header,
        artists: state.artists
    }),
    dispatch => ({
        willMount: (groupId, lang) => {
            console.log(groupId, lang);
            dispatch(getArtists(groupId, lang));
        },
        setArtist: (artistId, lang) => {
            dispatch(getArtist(artistId, lang));
        },
        unsetArtist: () => {
            dispatch({type: 'CLEAR_ARTISTS_ARTIST', payload: null});
        },
        onMount: () => {
            dispatch({type: 'SET_STYLE', payload: 'DARK'});
            dispatch({type: 'SET_OPACITY', payload: 'ALWAYS_FULL'});
        },
        onUnmount: () => {
            dispatch({type: 'SET_STYLE', payload: 'DEFAULT'});
            dispatch({type: 'SET_OPACITY', payload: 'DEFAULT'});
        }
    })
)(Artists));
