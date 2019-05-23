import React from 'react';
import { Marker } from 'google-maps-react';

const Markers = ({ name, photo, position }) => (
  <>
    <Marker name={name} position={position} />
    <Marker />
  </>
);

export default Markers;
