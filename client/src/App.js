import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { Home, About, Login, Profile, Register, Error, Issue, Result, MapBox, HeatMap, Graph } from './pages';
import { NavBar, AuthRoute } from './components';
import { loadPosition } from './utils';

class App extends Component {
  state = { issues: [], coords: {} };

  async componentDidMount() {
    this.getData();
    this.getPosition();
  }

  getData = async _ => {
    const { data = {} } = await axios.get('/results');
    const issues = Object.values(data.issues);
    this.setState({ issues });
  };

  getPosition = async _ => {
    const { coords } = await loadPosition();
    this.setState({ coords });
  };

  render() {
    const { issues, coords } = this.state;
    return (
      <>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
        <Route exact path="/issue" render={_ => <Issue coords={coords} />} />
        <Switch>
          {!!issues.length && <Route exact path="/results" render={_ => <Result issues={issues} />} />}
          {!!issues.length && <Route path="/results/map" render={_ => <MapBox issues={issues} coords={coords} />} />}
          <Route path="/results/heat-map" component={HeatMap} />
          {!!issues.length && <Route path="/results/graph" render={_ => <Graph issues={issues} coords={coords} />} />}
        </Switch>
        <Route exact path="/error" component={Error} />
        <AuthRoute exact path="/profile" component={Profile} />
      </>
    );
  }
}

export default App;
