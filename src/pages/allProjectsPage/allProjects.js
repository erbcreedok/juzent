import React, { Component } from 'react';
import NewsBlock from "../../components/newsBlockComponent/newsBlock";
import {Link, withRouter} from "react-router-dom";
import LocalizedStrings from 'react-localization';
import './allProjects.css';
import {connect} from "react-redux";
import {getAllProjects} from "../../actions/news";

class AllProjects extends Component {

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
                all: 'Проекты',
                last: 'Последние проекты'
            },
            kz: {
                all: 'Жобалар',
                last: 'Соңғы жобалар'
            },
            en:{
                all: 'Projects',
                last: 'Last projects'
            }
        });
        strings.setLanguage(this.props.lang);
        const projects = this.props.projects;

        const getProjects = () => {
            if (!projects) return;
            let rows = [];
            if (projects === 'LOADING') return;
            if (projects.length === 0) return;
            projects.map((project, index) => {
                rows.push(
                    <div className="col-md-4 mb-40" key={index}>
                        <Link to={'/article/project/' + project.id}>
                            <NewsBlock image={project.article_image} title={project.article_heading} text={project.article_subheading} date={project.article_created}/>
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
                            { getProjects() }
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
        projects: state.projects
    }),
    dispatch => ({
        willMount: (lang) => {
            dispatch(getAllProjects(lang));
        }
    })
)(AllProjects));