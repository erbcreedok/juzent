import React, { Component } from 'react';
import './equalizerSvg.css';

export default class EqualizerSvg extends Component {

    render() {
        return (
            <div className={'equalizer-icon ' + this.props.className}>
                <div className="equalizer-icon-column equalizer-column-1"/>
                <div className="equalizer-icon-column equalizer-column-2"/>
                <div className="equalizer-icon-column equalizer-column-3"/>
                <div className="equalizer-icon-column equalizer-column-4"/>
                <div className="equalizer-icon-column equalizer-column-5"/>
                <div className="equalizer-icon-column equalizer-column-6"/>
                <div className="equalizer-icon-column equalizer-column-7"/>
                <div className="equalizer-icon-column equalizer-column-8"/>
            </div>
        )
    }

}