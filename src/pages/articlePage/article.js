import React, { Component } from 'react';
import LocalizedStrings from 'react-localization';
import './article.css';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getNewsArticle, getProjectArticle} from "../../actions/news";

class Article extends Component {

    checkParams(lang) {
        if (this.props.match.params.type === 'news') {
            this.props.getNews(this.props.match.params.id, lang);
        } else if (this.props.match.params.type === 'project') {
            this.props.getProject(this.props.match.params.id, lang);
        } else {
            this.props.history.push('/allNews/');
        }
    }

    componentWillReceiveProps(props) {
        if (this.props.match.params.type !== props.match.params.type){
            this.checkParams(props.lang);
        }
        if (this.props.lang !== props.lang) {
            this.checkParams(props.lang);
        }
    }

    componentWillMount() {
        this.checkParams(this.props.lang);
    }

    render() {
        const strings = new LocalizedStrings({
            ru: {
                months: ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК']
            },
            kz: {
                months: ['ҚАН', 'АҚП', 'НАУ', 'СӘУ', 'МАМ', 'МАУ', 'ШІЛ', 'ТАМ', 'ҚЫР', 'ҚАЗ', 'ҚАР', 'ЖЕЛ']
            },
            en:{
                months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
            }
        });
        strings.setLanguage(this.props.lang);
        const article = this.props.article;

        const getTopImage = () => {
            if (!article.article_header_image) return (<section className="bg-image bg-gray" style={{height: '70px'}}/>);
            return (<section className="bg-image" style={{height: '350px', backgroundImage: `url(${article.article_header_image})`}}/>);
        };

        if (!article || article==='LOADING') {
            return (
                <div className="news-page">
                    <section className="bg-image bg-gray-loading" style={{height: '350px'}}/>
                    <section className="bg-lined full-view py-50">
                        <div className="container px-md-100">
                            <div className="row mb-md-70 mb-4">
                                <div className="col-12">
                                    <h2 className="bg-gray-loading border-rounded" style={{height: '30px', maxWidth: '100%'}}/>
                                    <h2 className="bg-gray-loading border-rounded" style={{height: '30px', maxWidth: '320px'}}/>
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col-12">
                                    <p className="bg-gray-loading border-rounded" style={{height: '24px', maxWidth: '100%'}}/>
                                    <p className="bg-gray-loading border-rounded" style={{height: '24px', maxWidth: '100%'}}/>
                                    <p className="bg-gray-loading border-rounded" style={{height: '24px', maxWidth: '50%'}}/>
                                    <div className="row justify-content-between mb-80">
                                        <div className="col-md-5">
                                            <div className="bg-gray-loading border-rounded" style={{height:'300px', width: '400px', maxWidth: '100%'}}/>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="bg-gray-loading border-rounded" style={{height: '24px', maxWidth: '100%'}}/>
                                            <p className="bg-gray-loading border-rounded" style={{height: '24px', maxWidth: '100%'}}/>
                                            <p className="bg-gray-loading border-rounded" style={{height: '24px', maxWidth: '50%'}}/>
                                        </div>
                                    </div>
                                    <p className="bg-gray-loading border-rounded" style={{height: '24px', maxWidth: '100%'}}/>
                                    <p className="bg-gray-loading border-rounded" style={{height: '24px', maxWidth: '100%'}}/>
                                    <p className="bg-gray-loading border-rounded" style={{height: '24px', maxWidth: '50%'}}/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
        return (
            <div className="news-page">
                { getTopImage() }
                <section className="bg-lined full-view py-50">
                    <div className="container px-md-100">
                        <div className="row mb-md-70 mb-4">
                            <div className="col-12">
                                <h2>
                                    { article.article_heading }
                                </h2>
                                <div className="date-container">
                                    <p className="mb-0 date-day">{("0" + article.article_created.getDate()).slice(-2)}</p>
                                    <p className="normal o-50 date-month">
                                        <span className="text-uppercase text-nowrap">{strings.months[article.article_created.getMonth()]}, {("0" + article.article_created.getYear()).slice(-2)}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-12" style={{maxWidth: '100%', overflowX: 'auto'}} dangerouslySetInnerHTML={{__html: article.article_body}}>
                            </div>
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
        article : state.article
    }),
    dispatch => ({
        getNews: (articleId, lang) => {
            dispatch(getNewsArticle(articleId, lang));
        },
        getProject: (articleId, lang) => {
            dispatch(getProjectArticle(articleId, lang));
        }
    })
)(Article));