import React, { Component } from 'react';
import ClosestTours from "../../components/closestToursComponent/closestTours";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Concerts extends Component {
    componentDidMount() {
        this.props.onMount();
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    render() {

        return(
            <div className="concerts-page">
                <section>
                    <div className="container">
                        <iframe src="http://yerbols.qtickets.ru" frameBorder="0" height="auto" width="100%"/>
                    </div>
                </section>
            </div>
        );

    }

}

export default withRouter(connect(
    state => ({
        header: state.header
    }),
    dispatch => ({
        onMount: () => {
            dispatch({type: 'SET_STYLE', payload: 'DARK'});
        },
        onUnmount: () => {
            dispatch({type: 'SET_STYLE', payload: 'DEFAULT'});
        }
    })
)(Concerts));