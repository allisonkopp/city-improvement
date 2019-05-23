import React from 'react';
import { SectionWrapper } from '../../components';
import { BarGraph } from '../BarGraph';

const Graph = ({ issues = [] }) => {
  return (
    <SectionWrapper>
      <h1>Graph here</h1>
      <BarGraph issues={issues} />
    </SectionWrapper>
  );
};

export default Graph;
