import React, { Component } from 'react';

import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem } from 'reactstrap';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import LanguageButton from '../languageButtonComponent/languageButton';
import LocalizedStrings from 'react-localization';

import './header.css';

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            isOpen: false,
            scrolled: window.scrollY > 10
        };

    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.handleScroll();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    componentWillReceiveProps(props) {
        if (this.props.location.pathname.split('/')[1] === props.location.pathname.split('/')[1]) return;
        this.closeNav();
        window.scrollTo(0,0);
        setTimeout(() => {
            this.handleScroll();
        }, 10);
    }

    handleScroll() {
        this.setState({
            scrolled: window.scrollY > 10
        });
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    closeNav() {
        this.setState({
           isOpen: false
        });
    }

    render() {
        const isColorDark = this.props.header.style === 'DARK' ? 'navbar-dark' : 'navbar-light';
        const isBackgroundTransparent = this.props.header.opacity !== 'ALWAYS_FULL' && !this.state.scrolled && !this.state.isOpen;
        const backgroundColor = isBackgroundTransparent ? '' : this.props.header.style === 'DARK' ? 'dark' : 'light';
        const strings = new LocalizedStrings({
            ru: {
                main:'Главная',
                artists: 'Артисты',
                songs: 'Медиатека',
                concerts: 'Концерты',
                contacts: 'Контакты'
            },
            kz: {
                main:'Басты бет',
                artists: 'Әртістер',
                songs: 'Медиатека',
                concerts: 'Концерт',
                contacts: 'Байланыс'
            },
            en:{
                main:'Home',
                artists: 'Artists',
                songs: 'Songs',
                concerts: 'Concerts',
                contacts: 'Contacts'
            }
        });
        strings.setLanguage(this.props.lang);
        return (
            <header>
                <Navbar fixed="top" expand="md" className={isColorDark} color={ backgroundColor }>
                    <Container fluid>
                        <NavbarBrand href="#">
                            <span className="icon-logo-juz-entertainment"/>
                        </NavbarBrand>
                        <LanguageButton/>
                        <NavbarToggler onClick={this.toggle}>
                            <span className="navbar-toggler-icon">
                                <span className="navbar-toggler-icon-line"/>
                            </span>
                        </NavbarToggler>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mx-auto main-nav" navbar>
                                <NavItem>
                                    <NavLink exact to={'/'} className="nav-link">{strings.main}</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to={'/artists'} className="nav-link">{strings.artists}</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to={'/songs'} className="nav-link">{strings.songs}</NavLink>
                                </NavItem>
                                <NavItem>
                                    <a href="http://juzent.com/tickets/" target="_blank" className="nav-link">{strings.concerts}</a>
                                </NavItem>
                                <NavItem>
                                    <NavLink to={'/contacts'} className="nav-link">{strings.contacts}</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}


const mapStateToProps = (state) => ({
    header: state.header,
    lang: state.languages
});

export default withRouter(connect(mapStateToProps)(Header));