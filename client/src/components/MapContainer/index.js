import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import axios from 'axios';
import Markers from '.';

export class MapContainer extends Component {
  state = { issues: [], coords: [], isOpen: false, activeMarker: {}, selectedPlace: {} };

  componentDidMount() {
    this.getData();
  }

  handleToggle = e => marker => {
    !this.state.isOpen
      ? this.setState({ isOpen: true, activeMarker: marker })
      : this.setState({ isOpen: false, activeMarker: null });
  };

  // setActiveMarker = e => marker => {
  //   this.setState({ activeMarker: marker });
  //   console.log(marker);
  // };

  getData = _ => {
    axios.get('/results').then(response => {
      let data = Object.entries(response.data.issues).map(x => x[1]);
      console.log(data);
      const coords = data.map(x => x.location.coordinates);

      console.log(coords);
      this.setState({ issues: data, coords: coords });
    });
  };

  // getMarkerInfo = (name, comments, img) => {
  //   return ()
  // }

  render() {
    return (
      <>
        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: 25.766128199999997,
            lng: -80.1961674
          }}
        >
          {this.state.issues.map(x => {
            return (
              <Marker
                onClick={this.handleToggle}
                position={{ lat: x.location.coordinates[0], lng: x.location.coordinates[1] }}
              >
                <InfoWindow onClick={this.handleToggle}>
                  {/* <h1>{x.issue}</h1> */}
                  <h1>Test!</h1>
                  {console.log('this is working?', x.issue)}
                </InfoWindow>
              </Marker>
            );
          })}
        </Map>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_KEY
})(MapContainer);
