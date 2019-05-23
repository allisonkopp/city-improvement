import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { SectionWrapper } from '../../components';
// import dotenv from 'dotenv';
import axios from 'axios';

// export class MapContainer extends Component {
export default class Result extends Component {
  state = { issues: [] };

  getData = e => {
    axios.get('/results').then(response => {
      this.setState({ issues: response.data });
    });
  };

  render() {
    return (
      <SectionWrapper>
        <button onClick={this.getCoords}>click me</button>
      </SectionWrapper>
      // <Map
      //   google={this.props.google}
      //   zoom={14}
      //   initialCenter={{
      //     lat: -1.2884,
      //     lng: 36.8233
      //   }}
      // />
    );
  }
}

// export default GoogleApiWrapper({
//   apiKey: process.env.GOOGLE_MAPS_KEY
// })(MapContainer);
