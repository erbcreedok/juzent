import React, { Component } from 'react';
import Jumbotron from "../../components/jumbotronComponent/jumbotron";
import LastNews from "../../components/lastNewsComponent/lastNews";
import NewReleases from "../../components/newReleasesComponent/newReleases";
import ClosestTours from "../../components/closestToursComponent/closestTours";
import LastProjects from "../../components/lastProjectsComponent/lastProjects";

export default class Main extends Component {

    render() {
        return (
            <div className="main-page">
                <Jumbotron/>
                <LastNews/>
                <NewReleases/>
                <LastProjects/>
                <ClosestTours/>
            </div>
        );
    }

}