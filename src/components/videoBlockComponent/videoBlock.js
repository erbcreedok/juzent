import React, { Component } from 'react';

import { Modal, ModalBody } from "reactstrap";

export default class VideoBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    getYoutubeCode(str) {
        if (str.indexOf('youtu.be') !== -1) {
            str = str.split('youtu.be/')[1];
            return str;
        }
        if (str.indexOf('/watch?v=') !== -1) {
            str = str.split('/watch?v=')[1];
            return str;
        }
        else return false;

    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    render() {
        const code = this.getYoutubeCode(this.props.src);
        return (
            <div className="video-block">
                <div className="image-container image-rounded mb-3" onClick={this.toggle}>
                    <img src={(code) ? 'https://i.ytimg.com/vi/' + code + '/maxresdefault.jpg' : this.props.img} alt=""/>
                </div>
                <h4 onClick={this.toggle}>
                    {this.props.title}
                </h4>
                <p className="color-red">
                    {this.props.date}
                </p>
                <Modal style={{maxWidth: '720px', width: 'auto'}} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <span className="icon-close" onClick={this.toggle}/>
                    <ModalBody>
                        <iframe width="100%" height="400px" src={(code) ? 'https://www.youtube.com/embed/' + code : this.props.src} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen=""/>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}