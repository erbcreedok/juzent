import React, { Component } from 'react';
import { Row, Button } from 'reactstrap';
import NewsBlock from '../newsBlockComponent/newsBlock';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getMainNews} from "../../actions/news";
import LocalizedStrings from 'react-localization';
import './lastNews.css';

class LastNews extends Component {

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
                last:'Последние новости',
                all: 'Все новости'
            },
            kz: {
                last:'Соңғы жаңалықтар',
                all: 'Барлық жаңалықтар'
            },
            en:{
                last:'Latest news',
                all: 'All news'
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

        return(
            <section className="section-news py-100 py-md-155 bg-lined bg-white full-view d-flex align-items-center">
                <div className="container">
                    <Row className="mb-40">
                        <div className="col-12 d-flex">
                            <h2 className="text-uppercase">{strings.last}</h2>
                            <Link to={'/allNews'} className="ml-auto">
                                <Button color="primary">
                                    <span className="text-uppercase">
                                        {strings.all}
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </Row>
                    <Row className="news-row">
                        { getNews() }
                    </Row>
                </div>
            </section>
        );
    }

}

export default withRouter(connect(
    state => ({
        news: state.news,
        lang: state.languages
    }),
    dispatch => ({
        willMount: (lang) => {
            dispatch(getMainNews(lang));
        }
    })
)(LastNews));