import React from 'react';
import { SectionWrapper, Map } from '../../components';
// import Map from '../../components/Map/index.jsx';

const MaxBox = ({ issues = [] }) => (
  <>
    <Map issues={issues} />
  </>
);

export default MaxBox;
