import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import { popupRenderer, parseGeoJson } from '../../utils';
import { MAPBOX_API_KEY } from '../../config';

class Map extends Component {
  state = { issues: parseGeoJson(this.props.issues) };

  componentDidMount() {
    mapboxgl.accessToken = MAPBOX_API_KEY;
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

  createMap = async mapOptions => {
    this.map = new mapboxgl.Map(mapOptions);
    const map = this.map;
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');
    const markerData = this.state.issues;
    console.log(markerData, 'hey this is marker data');
    map.on('load', _ => {
      // map.addSource('markers', { type: 'geojson', data: markerData });
      map.addSource('issueFrequency', {
        type: 'geojson',
        data: markerData
      });
      // map.addLayer({
      //   id: 'markers',
      //   type: 'symbol',
      //   source: 'markers',
      //   layout: {
      //     'icon-image': 'marker-15',
      //     'icon-size': 1.5,
      //     'icon-allow-overlap': true
      //   }
      // });
      map.addLayer({
        id: 'earthquakes-heat',
        type: 'heatmap',
        source: 'issueFrequency',
        maxzoom: 9,
        paint: {
          'heatmap-weight': ['interpolate', ['linear'], ['get', 'frequency'], 0, 0, 6, 1],
          'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(33,102,172,0)',
            0.2,
            'rgb(103,169,207)',
            0.4,
            'rgb(209,229,240)',
            0.6,
            'rgb(253,219,199)',
            0.8,
            'rgb(239,138,98)',
            1,
            'rgb(178,24,43)'
          ],
          // 'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
          'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 20, 30, 80, 100],
          'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0]
        }
      });
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

  flyTo = ({ longitude, latitude }) =>
    this.map.flyTo({
      center: [longitude, latitude],
      bearing: 20,
      zoom: 12,
      pitch: 20
    });

  render() {
    // console.log(this.props.issues, 'the props');
    // console.log(this.state.issues, 'the state');
    return (
      <>
        <div id="map" ref={el => (this.mapContainer = el)} />
      </>
    );
  }
}

export default Map;
