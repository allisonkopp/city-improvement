import React, { Component } from 'react';
import { SectionWrapper } from '../../components';
import { Link } from 'react-router-dom';

class Result extends Component {
  state = { issues: this.props.issues };

  // filterByCity = (dataArr, city) => {
  //   // return dataArr.filter(x => city === this.getLocation(x));
  //   return dataArr.filter(x => console.log(x.location.coordinates));
  // };

  render() {
    //console.log(this.getCity(25.766128199999997, -80.1961674));
    // console.log(this.getCity(40.715, -73.9843));
    // console.log(this.getCity(34.0522, -118.2437));

    return (
      <SectionWrapper>
        <Link to={'/results/map'}>See Map</Link>
        <Link to={'/results/graph'}>See Graph</Link>
      </SectionWrapper>
    );
  }
}

export default Result;
