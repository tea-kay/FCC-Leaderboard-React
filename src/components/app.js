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
      .then(axios.spread((recentCampers, allTimeCampers) => {
        this.setState({ recentCampers, allTimeCampers });
      }));
  }


  fetchRecentCampers() {
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
  }
  fetchAllTimCampers() {
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime');
  }
  changeView(currentView) {
    this.setState({ currentView  });
  }

  render() {
    return (
      <div>
        <h2>{`Viewing Top ${this.state.currentView}`}</h2>
        <button onClick={() => this.changeView('recentCampers')} className="btn btn-primary">Recent</button>
        <button onClick={() => this.changeView('allTimeCampers')} className="btn btn-primary">All Time</button>
      </div>
    );
  }
}
