import React, { Component } from 'react';
import { Row, Button } from 'reactstrap';
import NewsBlock from '../newsBlockComponent/newsBlock';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getMainProjects} from "../../actions/news";
import LocalizedStrings from 'react-localization';

class LastProjects extends Component {

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
                projects: 'Организуемые проекты',
                all: 'Все проекты'
            },
            kz: {
                projects: 'Ұйымдастырылған жобалар',
                all: 'Барлық жобалар'
            },
            en:{
                projects: 'Projects',
                all: 'All projects'
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

        return(
            <section className="section-news py-100 py-md-155 bg-lined bg-white full-view d-flex align-items-center">
                <div className="container">
                    <Row className="mb-40">
                        <div className="col-12 d-flex">
                            <h2 className="text-uppercase">{strings.projects}</h2>
                            <Link to={'/allProjects'} className="ml-auto">
                                <Button color="primary">
                                    <span className="text-uppercase">
                                        {strings.all}
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </Row>
                    <Row className="news-row">
                        {getProjects()}
                    </Row>
                </div>
            </section>
        );
    }

}

export default withRouter(connect(
    state => ({
        projects: state.projects,
        lang: state.languages
    }),
    dispatch => ({
        willMount: (lang) => {
            dispatch(getMainProjects(lang));
        }
    })
)(LastProjects));