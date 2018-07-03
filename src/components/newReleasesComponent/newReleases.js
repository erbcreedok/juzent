import React, { Component } from 'react';
import { Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import album from '../../assets/img/album_icon.png';
import {connect} from "react-redux";
import LocalizedStrings from 'react-localization';
import {getNewRelease} from "../../actions/news";
import AlbumCoverImage from "../AlbumCoverImageComponent/albumCoverImage";

class NewReleases extends Component {

    componentWillMount() {
        this.props.willMount();
    }

    render() {
        const strings = new LocalizedStrings({
            ru: {
                new: 'Новые релизы',
                all: 'Перейти к медиатеке',
                song: '{0} от {1}',
                date: 'Дата релиза: {day} {month} {year}',
                months: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
                label: 'Лэйбл',
                genre: 'Жанр',
                album: 'Альбом'
            },
            kz: {
                new: 'Жаңа әңдер',
                all: 'Медиатеканы көру',
                song: '{0} - {1}',
                date: 'Шығу уақыты: {day} {month} {year}',
                months: ['қантар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'],
                label: 'Лэйбл',
                genre: 'Жанр',
                album: 'Альбом'
            },
            en:{
                new: 'New Releases',
                all: 'See all songs',
                song: '{0} from {1}',
                date: 'Date of release: {day} {month} {year}',
                months: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
                label: 'Label',
                genre: 'Genre',
                album: 'Album'
            }
        });
        strings.setLanguage(this.props.lang);

        const release = this.props.release;

        return release && release !== 'LOADING' ? (
            <section className="releases-section bg-gray bg-lined py-100 py-md-155 full-view">
                <div className="container">
                    <Row className="mb-5">
                        <div className="col-12">
                            <h2>
                              <span className="text-uppercase">
                                  {strings.new}
                              </span>
                            </h2>
                        </div>
                    </Row>
                    <Row className="align-items-center">
                        <div className="col-md-6" style={{paddingRight: '70px', paddingLeft: '0'}}>
                            <AlbumCoverImage src={release.release_image} alternateSrc={release.release_cover} style={{width: '100%', height: 'auto'}}/>
                        </div>
                        <div className="col-md-6">
                            <h3>
                                {strings.formatString(strings.song, release.release_title, release.release_artist)}
                            </h3>
                            <p className="o-75 mb-4">
                                {strings.formatString(strings.date, {day: ("0" + release.release_date.getDate()).slice(-2), month: strings.months[release.release_date.getMonth()], year: release.release_date.getFullYear()})}
                            </p>
                            <p className="h4 py-3 mb-5">
                                {strings.label}: <span className="font-weight-bold">{release.label}</span> <br/>
                                {strings.genre}: <span className="font-weight-bold">{release.genre}</span> <br/>
                                {strings.album}: <span className="font-weight-bold">«{release.album}»</span> <br/>
                            </p>
                            <Link to="/songs">
                                <Button color="danger">
                                    <span className="text-uppercase">{strings.all}</span>
                                </Button>
                            </Link>
                        </div>
                    </Row>
                </div>
            </section>
        ) : '';
    }
}

export default connect(
    state => ({
        lang: state.languages,
        release: state.release
    }),
    dispatch => ({
        willMount: () => {
            dispatch(getNewRelease());
        }
    })
)(NewReleases);