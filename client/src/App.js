import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Home,
  About,
  Login,
  Profile,
  Register,
  Error,
  Issue,
  Result,
  GoogleMap,
  MapBox,
  HeatMap,
  Graph
} from './pages';
import { NavBar, AuthRoute } from './components';
import axios from 'axios';

class App extends Component {
  state = { issues: [], coords: [] };

  componentDidMount() {
    this.getData();
  }

  getData = _ => {
    axios.get('/results').then(response => {
      let data = Object.entries(response.data.issues).map(x => x[1]);
      // console.log(data);
      const coords = data.map(x => x.location.coordinates);
      // console.log(coords);
      this.setState({ issues: data, coords: coords });
    });
  };

  render() {
    return (
      <>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
        <Route exact path="/issue" component={Issue} />
        <Switch>
          <Route exact path="/results" render={_ => <Result issues={this.state.issues} />} />
          {/* <Route path="/results/google-map" render={_ => <GoogleMap issues={this.state.issues} />} /> */}
          <Route path="/results/map" render={_ => <MapBox issues={this.state.issues} />} />
          <Route path="/results/heat-map" component={HeatMap} />
          <Route path="/results/graph" render={_ => <Graph issues={this.state.issues} />} />
        </Switch>
        <Route exact path="/error" component={Error} />
        <AuthRoute exact path="/profile" component={Profile} />
      </>
    );
  }
}

export default App;
