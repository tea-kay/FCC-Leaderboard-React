import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentCampers: [],
      allTimeCampers: [],
      currentView: 'recentCampers'
    };
  }
  componentWillMount() {
    axios.all([this.fetchRecentCampers(), this.fetchAllTimCampers()])
      .then(axios.spread(function(recentCampers, allTimeCampers) {
        this.setState({ recentCampers, allTimeCampers });
      }));
  }


  fetchRecentCampers() {
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
  }
  fetchAllTimCampers() {
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime');
  }

  render() {
    return (
      <div>
        <h2>Display Campers</h2>
        <button className="btn btn-primary">Recent</button>
        <button className="btn btn-primary">All Time</button>
      </div>
    );
  }
}
