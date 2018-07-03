import React, { Component } from 'react';
import NewsBlock from "../../components/newsBlockComponent/newsBlock";
import {Link, withRouter} from "react-router-dom";
import LocalizedStrings from 'react-localization';
import './allNews.css';
import {connect} from "react-redux";
import {getAllNews} from "../../actions/news";

class AllNews extends Component {

    componentWillReceiveProps(props) {
        if (this.props.lang !== props.lang) {
            this.props.willMount(props.lang);
        }
    }

    componentWillMount() {
        this.props.willMount(this.props.lang);
    }

    render() {
        const strings = new LocalizedStrings({
            ru: {
                all: 'Новости',
                last: 'Последние новости'
            },
            kz: {
                all: 'Жаңалықтар',
                last: 'Соңғы жаңалықтар'
            },
            en:{
                all: 'News',
                last: 'Last news'
            }
        });
        strings.setLanguage(this.props.lang);

        const news = this.props.news;

        const getNews = () => {
            if (!news) return;
            let rows = [];
            if (news === 'LOADING') return;
            if (news.length === 0) return;
            news.map((news, index) => {
                rows.push(
                    <div className="col-md-4 mb-40" key={index}>
                        <Link to={'/article/news/' + news.id}>
                            <NewsBlock image={news.article_image} title={news.article_heading} text={news.article_subheading} date={news.article_created}/>
                        </Link>
                    </div>
                );
            });
            return rows;
        };

        return (
            <div className="all-news-page">
                <section className="bg-lined full-view py-md-155 py-100">
                    <div className="container">
                        <div className="row mb-3">
                            <div className="col-12">
                                <h2>
                                    <span className="text-uppercase">
                                        {strings.all}
                                    </span>
                                </h2>
                                <p className="big o-75 d-none d-md-block">
                                    {strings.last}
                                </p>
                            </div>
                        </div>
                        <hr className="mb-5"/>
                        <div className="row news-row">
                            { getNews() }
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default withRouter(connect(
    state => ({
        lang: state.languages,
        news: state.news
    }),
    dispatch => ({
        willMount: (lang) => {
            dispatch(getAllNews(lang));
        }
    })
)(AllNews));