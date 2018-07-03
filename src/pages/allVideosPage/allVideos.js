import React, { Component } from 'react';
import VideoBlock from "../../components/videoBlockComponent/videoBlock";
import {connect} from "react-redux";
import LocalizedStrings from 'react-localization';
import {getAllVideos} from "../../actions/videos";

class AllVideos extends Component {
    componentWillMount() {
        this.props.willMount(this.props.lang);
    }

    render() {
        const strings = new LocalizedStrings({
            ru: {
                clips: 'Видеоклипы',
                total: 'Всего видео',
            },
            kz: {
                clips: 'Бейнебаяндар',
                total: 'Бейнебаяндар саны',
            },
            en:{
                clips: 'Videoclips',
                total: 'Total videoclips',
            }
        });
        const allVideos = () => {
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

        strings.setLanguage(this.props.lang);
        return (
            <div className="all-videos-page">
                <section className="bg-lined full-view py-md-155 py-100">
                    <div className="container">
                        <div className="row mb-3">
                            <div className="col-12">
                                <h2>
                                    <span className="text-uppercase">
                                        {strings.clips}
                                    </span>
                                </h2>
                                <p className="big o-50 d-none d-md-block">
                                    {strings.total}: {(this.props.videos && this.props.videos!== 'LOADING') ? this.props.videos.length : ''}
                                </p>
                            </div>
                        </div>
                        <hr/>
                        <div className="row" style={{padding: '20px 0'}}>
                            {allVideos()}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default connect(
    state => ({
        lang: state.languages,
        videos: state.videos
    }),
    dispatch => ({
        willMount: () => {
            dispatch(getAllVideos());
        }
    })
)(AllVideos)