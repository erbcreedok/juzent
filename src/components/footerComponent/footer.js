import React, { Component } from 'react';
import SocialLinks from "../socialLinksComponent/socialLinks";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import LocalizedStrings from 'react-localization';
import {getTopConcerts} from "../../actions/concerts";
import {getGroups} from "../../actions/groups";

class Footer extends Component {

    componentWillReceiveProps(props) {
        if (this.props.lang !== props.lang) {
            this.props.getConcerts(props.lang);
            this.props.getGroups(props.lang);
        }
    }

    componentWillMount() {
        if (this.props.concerts && this.props.concerts !== 'LOADING') {
            this.props.getConcerts(this.props.lang);
        }
        if (this.props.groups && this.props.groups !== 'LOADING') {
            this.props.getGroups(this.props.lang);
        }
    }

    render() {
        const strings = new LocalizedStrings({
            ru: {
                main:'Главная',
                artists: 'Артисты',
                songs: 'Медиатека',
                concerts: 'Концерты',
                contacts: 'Контакты',
                lastNews: 'Последние новости',
                newReleases: 'Новые релизы',
                closestTours: 'Ближайшие туры',
                music: 'Музыка',
                videoClips: 'Видеоклипы',
                contactUs: 'Связаться с нами',
                def: 'JUZ ENTERTAINMENT – казахстанская звукозаписывающая компания и агентство по поиску талантов. Компания была основана в 2014 году Ерболатом Беделханом',
                months: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
            },
            kz: {
                main:'Басты бет',
                artists: 'Әртістер',
                songs: 'Медиатека',
                concerts: 'Концерт',
                contacts: 'Байланыс',
                lastNews: 'Соңғы жаңалықтар',
                newReleases: 'Жана релиздер',
                closestTours: 'Жақын арадығы турлар',
                music: 'Музыка',
                videoClips: 'Бейнебаяндар',
                contactUs: 'Бізбен хабарласу',
                def: 'JUZ ENTERTAINMENT – қазақстандық дыбыс жазу компаниясы және таланттарды іздеу агенттігі. Компанияның негізін салушы – Ерболат Беделхан.',
                months: ['қантар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'],
            },
            en:{
                main:'Home',
                artists: 'Artists',
                songs: 'Songs',
                concerts: 'Concerts',
                contacts: 'Contacts',
                lastNews: 'Latest news',
                newReleases: 'New releases',
                closestTours: 'Upcoming tours',
                music: 'Music',
                videoClips: 'Videoclips',
                contactUs: 'Contact with us',
                def: 'JUZ ENTERTAINMENT is a Kazakhstan record company and a talent search agency. The company was founded in 2014 by Erbolat Bedelkhan.',
                months: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
            }
        });
        strings.setLanguage(this.props.lang);

        const concerts = this.props.concerts;

        const getConcerts = () => {
            let r = [];
            if (!concerts || concerts === 'LOADING') return r;
            concerts.slice(0,5).map((concert, index) => {
                r.push(
                    <div className="child" key={index}>
                        <a href={concert.concert_sale_link} target="_blank"><span>{concert.concert_time.getDate()} {strings.months[concert.concert_time.getMonth()]} - {concert.concert_title}<br/>({concert.concert_location})</span></a>
                    </div>
                )
            });
            return r;
        };

        const groups = this.props.groups;
        const getGroups = () => {
            let r = [];
            if (!groups || groups === 'LOADING') return r;
            groups.map((group, index) => {
                r.push(
                    <div className="child" key={index}>
                        <Link to={'/artists/' + group.id}><span>{group.group_name}</span></Link>
                    </div>
                );
            });
            return r;
        };
        return (
            <footer>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <h2 className="mb-20">
                                <span className="icon-logo-juz-entertainment"/>
                            </h2>
                            <p className="small mb-50" style={{maxWidth: '303px'}} dangerouslySetInnerHTML={{__html: strings.def}}>
                            </p>
                        </div>
                        <div className="col-md-8 mb-3">
                            <div className="row">
                                <div className="col-12 d-flex flex-wrap">
                                    <div className="link-container">
                                        <p className="font-weight-bold normal">
                                            <Link to={'/'}><span className="text-uppercase">{strings.main}</span></Link>
                                        </p>
                                        <div className="child">
                                            <Link to={'/allNews'}><span>{strings.lastNews}</span></Link>
                                        </div>
                                        <div className="child">
                                            <Link to={'/songs'}><span>{strings.newReleases}</span></Link>
                                        </div>
                                        <div className="child">
                                            <a href="http://juzent.com/tickets" target="_blank">{strings.closestTours}</a>
                                        </div>
                                    </div>
                                    <div className="link-container">
                                        <p className="font-weight-bold normal">
                                            <Link to={'/artists'}><span className="text-uppercase">{strings.artists}</span></Link>
                                        </p>
                                        { getGroups() }
                                    </div>
                                    <div className="link-container">
                                        <p className="font-weight-bold normal">
                                            <Link to={'/songs'}><span className="text-uppercase">{strings.songs}</span></Link>
                                        </p>
                                        <div className="child">
                                            <Link to={'/songs'}><span>{strings.music}</span></Link>
                                        </div>
                                        <div className="child">
                                            <Link to={'/allVideos'}><span>{strings.videoClips}</span></Link>
                                        </div>
                                    </div>
                                    <div className="link-container" style={{maxWidth: '250px'}}>
                                        <p className="font-weight-bold normal">
                                            <a href="http://juzent.com/tickets" target="_blank"><span className="text-uppercase">{strings.concerts}</span></a>
                                        </p>
                                        { getConcerts() }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <p className="color-red text-center text-md-right font-10 font-weight-bold">
                                COPYRIGHT JUZ ENTERTAINMENT 2018
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default withRouter(connect(
    state => ({
        lang: state.languages,
        concerts: state.concerts,
        groups: state.groups
    }),
    dispatch => ({
        getConcerts: (lang) => {
            dispatch(getTopConcerts(lang));
        },
        getGroups: (lang) => {
            dispatch(getGroups(lang));
        },
    })
)(Footer));