import React, { Component } from 'react';

import './newsBlock.css';

class NewsBlock extends Component {

    render() {
        const date = new Date(this.props.date);
        const dateDOM = isNaN(date.getTime()) ? this.props.date : ('' + ("0" + date.getDate()).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear());
        return (
            <div className="news-block">
                <div className="image-container bg-image-cover mb-4" style={{backgroundImage: `url(${this.props.image.replace('(','%28').replace(')','%29')})`}}/>
                <h4 className="mb-3">{this.props.title}</h4>
                <p className="o-75 mb-4">{this.props.text}</p>
                <p className="color-red">{ dateDOM }</p>
            </div>
        );
    }

}

export default NewsBlock;