import React, { Component } from 'react';
import { SectionWrapper } from '../../components';
import { MapContainer } from '../../components';
import { Link } from 'react-router-dom';

const GoogleMap = ({ issues = [] }) => (
  <SectionWrapper>
    <MapContainer issues={issues} />
  </SectionWrapper>
);

export default GoogleMap;
