import React, { Component } from 'react';
import { SectionWrapper } from '../../components';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Result extends Component {
  state = { issues: [] };

  componentDidMount() {
    this.getData();
  }
  getData = _ => {
    const { issues } = this.props;
    this.setState({ issues });
  };

  getCity = (lat, lng) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCcpS1KIaglRrIkvMb_Vf-uBYPdMRoFlXw`
      )
      .then(response => console.log(response.data.results[0].address_components[3].long_name));
  };

  // getLocation = (dataArr, city) => {
  //   return dataArr.map(x => {
  //     const lat = x.location.coordinates[0];
  //     const lng = x.location.coordinates[1];
  //     console.log(this.getCity(lat, lng));
  //     return this.getCity(lat, lng) === city;
  //   });
  // };

  getLocation = dataArr => {
    return dataArr.map(x => {
      const lat = x.location.coordinates[0];
      const lng = x.location.coordinates[1];
      console.log(this.getCity(lat, lng), 'this is working!');
    });
  };

  // filterByCity = (dataArr, city) => {
  //   // return dataArr.filter(x => city === this.getLocation(x));
  //   return dataArr.filter(x => console.log(x.location.coordinates));
  // };

  render() {
    console.log(this.getCity(25.766128199999997, -80.1961674));
    console.log(this.getCity(40.715, -73.9843));
    console.log(this.getCity(34.0522, -118.2437));

    console.log(this.getLocation(this.props.issues), 'please');

    // console.log(this.getLocation(this.props.issues, 'Miami'), "this is what i'm looking at");

    // console.log(this.filterByCity(this.props.issues));

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
