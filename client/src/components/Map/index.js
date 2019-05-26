import React, { Component } from 'react';
import { SectionWrapper } from '..';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import { popupRenderer } from '../../utils';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

class Map extends Component {
  state = { issues: [] };

  async componentDidMount() {
    await this.getData();
    // const position = await loadPosition();
    // const geoLoc = [position.coords.longitude, position.coords.latitude];
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5keXdlaXNzMTk4MiIsImEiOiJIeHpkYVBrIn0.3N03oecxx5TaQz7YLg2HqA';
    const mapOptions = {
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: 12,
      center: [-80.19, 25.76]
    };
    const geolocationOptions = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    };
    await this.createMap(mapOptions, geolocationOptions);
  }

  getData = _ => {
    const { issues } = this.props;
    this.setState({ issues });
  };

  createMap = (mapOptions, geolocationOptions) => {
    this.map = new mapboxgl.Map(mapOptions);
    const map = this.map;
    // map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken }));
    // map.addControl(
    //   new mapboxgl.GeolocateControl({
    //     positionOptions: geolocationOptions,
    //     trackUserLocation: true
    //   })
    // );
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');
    map.on('load', _ => {
      this.fetchPlaces();
      map.on('click', 'markers', this.handleMarkerClick);
    });
  };

  handleMarkerClick = e => {
    const map = this.map;
    const { properties, geometry = {} } = e.features[0];
    const coordinates = [...geometry.coordinates];
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    map.flyTo({ center: coordinates, speed: 0.3, zoom: 14 });
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(popupRenderer(properties))
      .addTo(map);
  };

  fetchPlaces = _ => {
    const map = this.map;
    this.props.issues.forEach(x => {
      const elm = document.createElement('div');
      elm.className = 'mapbox-marker';
      // const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      //   ReactDOMServer.renderToStaticMarkup(<Popup location={location} />)
      // );
      const marker = new mapboxgl.Marker(elm).setLngLat([x.location.coordinates[1], x.location.coordinates[0]]);
      marker.addTo(map);
    });
  };

  flyTo = ({ longitude, latitude }) =>
    this.map.flyTo({
      center: [longitude, latitude],
      bearing: 20,
      zoom: 12,
      pitch: 20
    });

  render() {
    console.log(this.props.issues, 'the props');
    console.log(this.state.issues, 'the state');
    return (
      <>
        <div id="map" ref={el => (this.mapContainer = el)} />
      </>
    );
  }
}

export default Map;
