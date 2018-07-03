import React, { Component } from 'react';
import Slider from "react-slick";
import {Link, withRouter} from "react-router-dom";
import LocalizedStrings from 'react-localization';
import './allArtists.css';
import {connect} from "react-redux";
import {getGroups} from "../../actions/groups";

class AllArtists extends Component {

    componentWillReceiveProps(props) {
        if (this.props.lang !== props.lang) {
            this.props.onLoad(props.lang);
        }
    }
    componentWillMount() {
        this.props.onLoad(this.props.lang);
    }


    render() {
        const strings = new LocalizedStrings({
            ru: {
                all: 'Все артисты',
            },
            kz: {
                all: 'Барлық әртістер',
            },
            en:{
                all: 'All artists',
            }
        });
        strings.setLanguage(this.props.lang);
        const settings = {
            infinite: true,
            slidesToShow: 1,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false
                    }
                }
            ]
        };

        const getArtists = () => {
            if (this.props.groups === undefined || this.props.groups === [] || this.props.groups.length === 0) {
                return (
                    <div className="col-12">
                        <div className="artists-avatar image-container image-rounded mb-5 bg-gray-loading"/>
                        <h4 className="bg-gray-loading border-rounded" style={{height: '26px', width: '150px'}}></h4>
                    </div>
                );
            }
            let r = [];
            this.props.groups.map((group, index) => {
                r.push(
                    <Link to={'/artists/' + group.group_id} className="all-artists-item no-style col-12" key={index}>
                        <div className="artists-avatar image-container image-rounded mb-5 bg-gray-loading">
                            <img src={group.group_avatar} alt="" style={{maxHeight: 'none'}}/>
                            <span className="artists-avatar-text">{group.group_name} ➔</span>
                        </div>
                        <h4 className="color-red all-artists-item-name">
                            {group.group_name}
                        </h4>
                        <p className="o-75 all-artists-item-description" dangerouslySetInnerHTML={{__html: group.group_description}}/>
                    </Link>
                );
            });
            return r;
        };

        return (
            <div className="all-albums-page bg-gray">
                <section className="bg-lined full-view py-md-155 py-100">
                    <div className="container">
                        <div className="row mb-5">
                            <div className="col-12">
                                <h2>
                                    <span className="text-uppercase">
                                        {strings.all}
                                    </span>
                                </h2>
                            </div>
                        </div>
                        <Slider {...settings} className="row all-artists-list">
                            { getArtists() }
                        </Slider>
                    </div>
                </section>
            </div>
        )
    }
}

export default withRouter(connect(
        state => ({
            lang: state.languages,
            groups: state.groups
        }),
        dispatch => ({
            onLoad: (lang) => {
                dispatch(getGroups(lang));
            }
        })
)(AllArtists));