import React, { Component } from 'react';
import { SectionWrapper } from '../../components';
import { MapContainer } from '../../components';

class Result extends Component {
  // state = { issues: [], coords: [] };

  // getData = e => {
  //   axios.get('/results').then(response => {
  //     const data = Object.entries(response.data.issues);
  //     console.log(data);
  //     const coords = data.map(x => x[1].location);
  //     console.log(coords);
  //     this.setState({ issues: data, coords: coords });
  //   });
  // };

  render() {
    return (
      <SectionWrapper>
        <MapContainer />
      </SectionWrapper>
    );
  }
}

export default Result;
