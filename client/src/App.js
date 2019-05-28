import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { Home, About, Login, Profile, Register, Error, Issue, Result, MapBox, Feed, Graph } from './pages';
import { NavBar, AuthRoute } from './components';
import { loadPosition } from './utils';

class App extends Component {
  state = { issues: [], coords: {}, refetch: false };

  componentDidMount() {
    this.getData();
    this.getPosition();
  }

  componentDidUpdate() {
    this.state.refetch && this.getData();
  }

  getData = async _ => {
    const { data = {} } = await axios.get('/results');
    const issues = Object.values(data.issues);
    this.setState({ issues, refetch: false });
  };

  getPosition = async _ => {
    const { coords } = await loadPosition();
    this.setState({ coords });
  };

  refetch = _ => this.setState({ refetch: true });

  render() {
    const { issues, coords } = this.state;
    return (
      <>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
        <Route exact path="/issue" render={_ => <Issue coords={coords} refetch={this.refetch} />} />
        {/* {!!issues.length && <Route path="/feed" render={_ => <Feed issues={issues} coords={coords} />} />} */}
        <Route path="/feed" component={Feed} />
        <Switch>
          {!!issues.length && <Route exact path="/results" render={_ => <Result issues={issues} />} />}
          {!!issues.length && <Route path="/results/map" render={_ => <MapBox issues={issues} coords={coords} />} />}
          {!!issues.length && <Route path="/results/graph" render={_ => <Graph issues={issues} coords={coords} />} />}
        </Switch>
        <Route exact path="/error" component={Error} />
        <AuthRoute exact path="/profile" component={Profile} />
      </>
    );
  }
}

export default App;
