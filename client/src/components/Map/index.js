import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { kebabCase } from 'lodash';
import './Map.css';
import { popupRenderer, parseGeoJson, groupBy, labels, geolocationOptions } from '../../utils';
import { DynamicButton } from '..';
import { generateHeatMapLayer, generateStreetLayer, generateMapOptions } from './Map.props';
import { MAPBOX_API_KEY } from '../../config';

const layers = labels.map(l => kebabCase(l.issue));
const mapViews = ['street', 'heat'];
class Map extends Component {
  state = { issues: this.props.issues, visibleLayers: layers, activeMap: 'street' };

  componentDidMount() {
    const { coords: { longitude: lng, latitude: lat } = {} } = this.props;
    mapboxgl.accessToken = MAPBOX_API_KEY;
    const mapOptions = generateMapOptions({ lng, lat });
    this.createMap(mapOptions, geolocationOptions);
  }

  createMap = async mapOptions => {
    this.map = new mapboxgl.Map(mapOptions);
    const map = this.map;
    const nav = new mapboxgl.NavigationControl();
    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: geolocationOptions,
      trackUserLocation: true
    });
    map.addControl(nav, 'top-right');
    map.addControl(geolocateControl);
    map.on('load', _ => this.addMapLayers());
    map.on('style.load', _ => this.addMapLayers());
  };

  addMapLayers = _ => {
    const map = this.map;
    const { issues, activeMap } = this.state;
    const issueCategories = groupBy(issues, 'issue');
    Object.keys(issueCategories).forEach(key => {
      const category = kebabCase(key);
      const heatCategory = `heat-${category}`;
      const layerId = activeMap === 'street' ? category : heatCategory;
      if (map.getLayer(layerId)) return;
      const layer = activeMap === 'street' ? generateStreetLayer(layerId) : generateHeatMapLayer(layerId);
      const data = parseGeoJson(issueCategories[key]);
      map.addSource(layerId, { type: 'geojson', data });
      map.addLayer(layer);
      map.on('click', category, this.handleMarkerClick);
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

  toggleLayer = layer => _ => {
    const map = this.map;
    const { visibleLayers } = this.state;
    let layers;
    const heat = `heat-${layer}`;
    const streetLayer = map.getLayer(layer);
    const heatLayer = map.getLayer(`heat-${layer}`);
    if (visibleLayers.includes(layer)) {
      layers = visibleLayers.filter(l => l !== layer);
      streetLayer && map.setLayoutProperty(layer, 'visibility', 'none');
      heatLayer && map.setLayoutProperty(heat, 'visibility', 'none');
    } else {
      layers = [...visibleLayers, layer];
      streetLayer && map.setLayoutProperty(layer, 'visibility', 'visible');
      heatLayer && map.setLayoutProperty(heat, 'visibility', 'visible');
    }
    this.setState({ visibleLayers: layers });
  };

  toggleMap = type => _ => {
    const { visibleLayers, activeMap } = this.state;
    const map = this.map;
    if (!map || type === activeMap) return;
    const heatVisibity = type === 'street' ? 'none' : 'visible';
    const layerVisibility = type === 'street' ? 'visible' : 'none';
    const mapStyle = type === 'street' ? 'streets-v9' : 'dark-v10';
    visibleLayers.forEach(layer => {
      const heatLayer = `heat-${layer}`;
      map.getLayer(heatLayer) && map.setLayoutProperty(heatLayer, 'visibility', heatVisibity);
      map.getLayer(layer) && map.setLayoutProperty(layer, 'visibility', layerVisibility);
    });
    map.setStyle(`mapbox://styles/mapbox/${mapStyle}`);
    this.setState({ activeMap: type });
  };

  render() {
    const { visibleLayers, activeMap } = this.state;
    return (
      <div className="map-container">
        <div className="layer-list">
          {layers.map(layer => (
            <DynamicButton
              key={layer}
              active={visibleLayers.includes(layer)}
              onClick={this.toggleLayer}
              label={layer}
            />
          ))}
        </div>
        <div className="layer-list">
          {mapViews.map(type => (
            <DynamicButton key={type} active={activeMap === type} onClick={this.toggleMap} label={type} />
          ))}
        </div>
        <div id="map" ref={el => (this.mapContainer = el)} />
      </div>
    );
  }
}

export default Map;
