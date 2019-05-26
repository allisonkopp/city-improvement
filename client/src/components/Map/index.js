import React, { Component } from 'react';
import { SectionWrapper } from '..';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import { popupRenderer, parseGeoJson } from '../../utils';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

class Map extends Component {
  state = { issues: [], parsedData: parseGeoJson(this.props.issues) };

  componentDidMount() {
    this.getData();

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
    this.createMap(mapOptions, geolocationOptions);
  }

  getData = _ => {
    console.log(this.props, 'props');
    const { issues } = this.props;
    this.setState({ issues }, console.log(issues));
  };

  // parseData = data => {
  //   if (data.length) this.setState({ parsedData: parseGeoJson(data) });
  // };

  createMap = async mapOptions => {
    this.map = new mapboxgl.Map(mapOptions);
    const map = this.map;

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');

    const markerData = await this.state.parsedData;
    console.log(markerData, 'this is marker data');

    map.on('load', _ => {
      this.fetchPlaces();
      map.addSource('markers', { type: 'geojson', data: markerData });
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

  // map.on('click', 'places', function(e) {
  //   var coordinates = e.features[0].geometry.coordinates.slice();
  //   var description = e.features[0].properties.description;

  //   // Ensure that if the map is zoomed out such that multiple
  //   // copies of the feature are visible, the popup appears
  //   // over the copy being pointed to.
  //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
  //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  //   }

  //   new mapboxgl.Popup()
  //     .setLngLat(coordinates)
  //     .setHTML(description)
  //     .addTo(map);
  // });

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
    // console.log(this.state.parsedData, 'the parsed data please');
    return (
      <>
        <div id="map" ref={el => (this.mapContainer = el)} />
      </>
    );
  }
}

export default Map;
