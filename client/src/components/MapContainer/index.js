import React, { Component } from 'react';
import { SectionWrapper } from '../../components';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
// import MarkerInfo from '../MarkerInfo';
import axios from 'axios';
import InfoWindow from '../InfoWindow';

export class MapContainer extends Component {
  state = { issues: [], coords: [], showInfoWindow: false, activeMarker: {} };
  // isOpen: false, activeMarker: String(), selectedPlace: { }

  componentDidMount() {
    this.getData();
  }

  onInfoWindowClose = _ => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  };

  onMapClick = _ => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  // handleToggle = e => (markerId, props) => {
  //   !this.state.isOpen
  //     ? this.setState({ isOpen: true, activeMarker: markerId, selectedPlace: props })
  //     : this.setState({ isOpen: false, activeMarker: null, selectedPlace: null });
  //   console.log(this.state.isOpen);
  //   console.log(this.state.activeMarker);
  //   console.log(this.state.selectedPlace);
  // };

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

  render() {
    return (
      <SectionWrapper>
        <Map
          onClick={this.onMapClick}
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
                // onClick={this.handleToggle(x._id)}
                position={{ lat: x.location.coordinates[0], lng: x.location.coordinates[1] }}
              >
                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  onClose={this.onInfoWindowClose}
                >
                  <h1>Hello world</h1>
                </InfoWindow>
              </Marker>
            );
          })}
        </Map>
        {/* <Markers /> */}
      </SectionWrapper>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_KEY
})(MapContainer);
