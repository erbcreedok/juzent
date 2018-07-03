import React, { Component } from 'react';
import disk from '../../assets/img/disk.png';

export default class AlbumCoverImage extends Component {

    render() {

        const width = (this.props.style && this.props.style.width) ? this.props.style.width : '250px';
        const height = (this.props.style && this.props.style.height) ? this.props.style.width : '180px';
        const cover = this.props.src ? this.props.src : '';
        const alternateCover = this.props.alternateSrc ? this.props.alternateSrc : cover;

        const svg = `<svg width=${width} height=${height} viewBox="0 0 746 539" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M85,170 C38.0557963,170 0,131.944204 0,85 C0,38.0557963 38.0557963,0 85,0 C131.944204,0 170,38.0557963 170,85 C170,131.944204 131.944204,170 85,170 Z M85.5,116 C102.344685,116 116,102.344685 116,85.5 C116,68.6553151 102.344685,55 85.5,55 C68.6553151,55 55,68.6553151 55,85.5 C55,102.344685 68.6553151,116 85.5,116 Z" id="path-1"/><linearGradient x1="13.6752705%" y1="2.08625034%" x2="94.019145%" y2="79.9147026%" id="linearGradient-3"><stop stop-color="#D1C3C3" offset="0%"/><stop stop-color="#A59A9A" offset="100%"/></linearGradient><rect id="path-4" x="0" y="0" width="474" height="473"/></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Disk"><image x="0" y="0" width="746" height="539" xlink:href="${disk}"/><g id="Oval" transform="translate(430.000000, 176.000000)"><mask id="mask-2" fill="white"><use xlink:href="#path-1"/></mask><g id="OvalMask"/><image id="OvalCover" mask="url(#mask-2)" x="-17" y="-8" width="210" height="210" xlink:href="${alternateCover}"/></g><g id="Rect" transform="translate(22.000000, 28.000000)"><mask id="mask-5" fill="white"><use xlink:href="#path-4"/></mask><use id="RectangleMask" fill="url(#linearGradient-3)" xlink:href="#path-4"/><image id="RectangleCover" mask="url(#mask-5)" x="0" y="-5" width="500" height="500" xlink:href="${cover}"/></g></g></g></svg>`;

        return (
            <div dangerouslySetInnerHTML={{__html: svg}}/>
        )
    }

}