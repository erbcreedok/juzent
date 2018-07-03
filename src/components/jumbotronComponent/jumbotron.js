import React, { Component } from 'react';
import { Row } from 'reactstrap';
import './jumbotron.css';
import { isMobile } from 'react-device-detect';
import logoBorder from '../../assets/img/logo-border.svg';
class Jumbotron extends Component {

    render() {
        return (
            (!isMobile) ?
                <section className="main-jumbotron bg-dot">
                    <video playsInline autoPlay muted loop>
                        <source src="https://firebasestorage.googleapis.com/v0/b/droppit-18476.appspot.com/o/bg-juz.mp4?alt=media&token=94b946f8-0aea-4623-91c8-e2266eea9b82"/>
                    </video>
                    <div className="container-fluid">
                        <Row className="align-items-center full-view justify-content-center py-100">
                            <span className="icon-logo-juz-entertainment icon-logo"/>
                        </Row>
                    </div>
                </section>
                :
                <section className="main-jumbotron bg-dot">
                    <div className="container-fluid">
                        <Row className="align-items-center full-view justify-content-center py-100">
                            <div className="jumbotron-background">
                                <img src={logoBorder} alt=""/>
                                <img src={logoBorder} alt=""/>
                                <img src={logoBorder} alt=""/>
                            </div>
                            <span className="icon-logo-juz-entertainment icon-logo is-mobile"/>
                        </Row>
                    </div>
                </section>

        );
    }

}

export default Jumbotron;