import React, { Component } from 'react';
import {Button} from "reactstrap";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import './languageButton.css';

class LanguageButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            languages: [{code:'ru', short:'РУС'}, {code:'kz', short:'ҚАЗ'}, {code:'en', short:'ENG'}]
        };

        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);
        this.closeButton = this.closeButton.bind(this);
    }


    toggleOpen() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    closeButton() {
        this.setState({
           isOpen: false
        });
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.closeButton();
        }
    }

    render() {
        const getButtons = () => {
            const mainLang = this.state.languages.find(lang => lang.code === this.props.lang);
            let i = 0;
            let r = [<Button key={i} className="round-button round-button-red" onClick={() => {this.props.setLanguage(mainLang.code)}}>{mainLang.short}</Button>];
            this.state.languages.map((lang) => {
                if (lang === mainLang) return;
                i++;
                r.push(
                    <Button key={i} className="round-button round-button-red unselected" onClick={() => {this.props.setLanguage(lang.code)}}>{lang.short}</Button>
                )
            });
            return r;
        };

        return (
            <div className={'language-button ml-auto mr-4 my-3 ' + (this.state.isOpen ? 'opened' : '')} onClick={this.toggleOpen} ref={(node) => {this.wrapperRef = node}}>
                {getButtons()}
            </div>
        )
    }
}

export default withRouter(connect(
    state => ({
        lang: state.languages
    }),
    dispatch => ({
        setLanguage: (lang) => {
            dispatch({type: 'SET_LANGUAGE', payload: lang});
        }
    })
)(LanguageButton))