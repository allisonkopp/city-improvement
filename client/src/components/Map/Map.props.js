export const generateMapOptions = ({ lat, lng }) => ({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9',
  zoom: 12,
  center: [lng || -80.19, lat || 25.76]
});
const icons = {
  debris: 'restaurant-15',
  flood: 'bar-15',
  'light-outage': 'airfield-15',
  pothole: 'aquarium-15',
  recycling: 'bakery-15',
  'traffic-pattern': 'bank-15',
  garbage: 'dog-park-15',
  other: 'golf-15'
};

export const generateStreetLayer = layerId => ({
  id: layerId,
  type: 'symbol',
  source: layerId,
  layout: {
    'icon-image': icons[layerId],
    'icon-size': 2,
    'icon-allow-overlap': true
  }
});

export const generateHeatMapLayer = layerId => ({
  id: layerId,
  type: 'heatmap',
  source: layerId,
  maxzoom: 9,
  paint: {
    'heatmap-weight': ['interpolate', ['linear'], ['get', 'frequency'], 0, 0, 6, 4],
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
    'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
    // 'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 20, 30, 80, 100],
    'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0]
  }
});
