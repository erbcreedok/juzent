import React, { Component } from 'react';
import SocialLinks from "../../components/socialLinksComponent/socialLinks";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import LocalizedStrings from 'react-localization';

class Contacts extends Component {
    componentDidMount() {
        this.props.onMount();
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    render() {
        const strings = new LocalizedStrings({
            ru: {
                contacts: 'Контакты',
                pr: 'PR-Менеджер',
                office: 'Главный офис',
                social: 'Мы в социальной сети',
                vacancy: 'Вакансии',
                team: 'Хочешь попасть в нашу команду?',
                commerce: 'По всем коммерческим предложениям',
                concerts: 'По концертным программам',
            },
            kz: {
                contacts: 'Байланыс',
                pr: 'PR-Менеджер',
                office: 'Бас офис',
                social: 'Біз әлеуметтік желіде',
                vacancy: 'Вакансиялар',
                team: 'Бізге қосылғыныз келе ме?',
                commerce: 'Барлық коммерциялық ұсыныстар бойынша',
                concerts: 'Концерттік бағдарламалар бойынша',
            },
            en:{
                contacts: 'Contacts',
                pr: 'PR Manager',
                office: 'Main office',
                social: 'Find us in social media',
                vacancy: 'Vacancy',
                team: 'Want to join?',
                commerce: 'For all commercial offers',
                concerts: 'For concert programs',
            }
        });
        strings.setLanguage(this.props.lang);

        return (
            <div className="contacts-page">
                <section className="bg-white bg-lined full-view py-md-155 py-100">
                    <div className="container">
                        <div className="row mb-40">
                            <div className="col-12">
                                <h2>
                                    <span className="text-uppercase">
                                        { strings.contacts }
                                    </span>
                                </h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-40">
                                {/*<p className="big">*/}
                                    {/*{strings.pr}: <a className="a-inherit" href="tel: 87012703444">8 (701) 2703 444</a>*/}
                                {/*</p>*/}
                                {/*<p>*/}
                                    {/*{strings.office}: <a className="a-inherit" href="tel: 87272703444">8 (727) 2703 444</a>*/}
                                {/*</p>*/}
                                <p>
                                    {strings.commerce} <a href="mailto: a.demegen@juzent.co">a.demegen@juzent.co</a>
                                </p>
                                <p>
                                    {strings.concerts} <a href="mailto: g.beressova@juzent.co">g.beressova@juzent.co</a>
                                </p>
                            </div>
                            <div className="col-md-5 mb-40">
                                <h4 className="mb-5">
                                    <span>{strings.social}</span>
                                </h4>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="mr-5">
                                            <h5 className="mb-3">JUZ ENTERTAINMENT</h5>
                                            <SocialLinks
                                                mail="info@juzent.com"
                                                instagram="https://www.instagram.com/juzentertainment/"
                                                dark
                                            />
                                        </div>
                                        <div className="mr-5">
                                            <h5 className="mb-3">Ninety One</h5>
                                            <SocialLinks
                                                facebook="https://www.facebook.com/XCIofficial/"
                                                youtube="https://www.youtube.com/channel/UCd3X-p_3fRLHnu8LCPOMTNg"
                                                instagram="https://www.instagram.com/91ninetyone.kz/"
                                                twitter="https://twitter.com/XCIofficial?lang=ru"
                                                dark
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*<div className="col-md-6 mb-40">*/}
                                {/*<h4 className="mb-20">*/}
                                    {/*<span className="text-uppercase">{strings.vacancy}</span>*/}
                                {/*</h4>*/}
                                {/*<p className="big mb-4">*/}
                                    {/*{strings.team}*/}
                                {/*</p>*/}
                                {/*<a href="//hh.kz">*/}
                                    {/*<img src="https://firebasestorage.googleapis.com/v0/b/juz-entertainment-8c282.appspot.com/o/hh_kz.png?alt=media&token=f5805f78-e314-44e7-88cd-71829d179029" alt="" height="20px"/>*/}
                                {/*</a>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default withRouter(connect(
    state => ({
        lang: state.languages,
        header: state.header
    }),
    dispatch => ({
        onMount: () => {
            dispatch({type: 'SET_STYLE', payload: 'DARK'});
            dispatch({type: 'SET_OPACITY', payload: 'ALWAYS_FULL'})
        },
        onUnmount: () => {
            dispatch({type: 'SET_STYLE', payload: 'DEFAULT'});
            dispatch({type: 'SET_OPACITY', payload: 'DEFAULT'})
        }
    })
)(Contacts));