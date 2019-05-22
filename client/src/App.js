import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, About, Login, Profile, Register, Error, Issue } from './pages';
import { NavBar, AuthRoute } from './components';
import axios from 'axios';

class App extends Component {
  state = { issues: [] };

  addIssue = async formData => {
    await axios.post('/issue/create', formData);
    console.log('this is my form data', formData);
  };

  handleUpload = file => {
    axios.post('/issue/upload', file).then(response => {
      const secureUrl = response.secure_url;
      console.log(secureUrl);
      return secureUrl;
    });
    // return 'this is working';
    //console.log(file, 'this is the file');
    // console.log('this is my file', file);
  };

  render() {
    return (
      <>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
        <Route exact path="/issue" render={_ => <Issue addIssue={this.addIssue} handleUpload={this.handleUpload} />} />
        <Route exact path="/error" component={Error} />
        <AuthRoute exact path="/profile" component={Profile} />
      </>
    );
  }
}

export default App;
