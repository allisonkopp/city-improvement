import React, { Component } from 'react';
import { SectionWrapper } from '../../components';
import { Link } from 'react-router-dom';

class Result extends Component {
  render() {
    return (
      <SectionWrapper>
        <Link to={'/results/map'}>See Map</Link>
        <Link to={'/results/heat-map'}>See Heat Map</Link>
        <Link to={'/results/graph'}>See Graph</Link>
      </SectionWrapper>
    );
  }
}

export default Result;
