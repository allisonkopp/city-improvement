import React, { Component } from 'react';
import { SectionWrapper } from '../../components';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PopUp from '../PopUp';
// import InfoWindow from '../InfoWindow';

export class MapContainer extends Component {
  state = { issues: [], isOpen: false, activeMarker: null };

  componentDidMount() {
    this.getData();
  }

  handleToggle = e => markerId => {
    !this.state.isOpen
      ? this.setState({ isOpen: true, activeMarker: markerId })
      : this.setState({ isOpen: false, activeMarker: null });
    console.log(this.state.isOpen);
  };

  getData = _ => {
    const { issues } = this.props;
    this.setState({ issues });
  };

  render() {
    return (
      <SectionWrapper>
        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: 25.766128199999997,
            lng: -80.1961674
          }}
        >
          {this.props.issues.map(x => {
            return (
              <Marker
                onClick={this.handleToggle(x._id)}
                position={{ lat: x.location.coordinates[0], lng: x.location.coordinates[1] }}
              >
                {this.state.isOpen ? <PopUp issue={x.name} close={this.handleToggle(x._id)} /> : null}
              </Marker>
            );
          })}
        </Map>
      </SectionWrapper>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_KEY
})(MapContainer);
