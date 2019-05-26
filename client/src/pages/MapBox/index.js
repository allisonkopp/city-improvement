import React, { Component } from 'react';
import { SectionWrapper, Map } from '../../components';
// import Map from '../../components/Map/index.jsx';

const MaxBox = ({ issues = [] }) => (
  <SectionWrapper>
    <Map issues={issues} />
  </SectionWrapper>
);

export default MaxBox;
