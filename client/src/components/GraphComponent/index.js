import React from 'react';
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

import './GraphComponent.css';

import { CustomizedAxisTick } from './CustomizedAxisTick';
// import { CustomizedLabel } from './CustomizedLabel';
import { CustomTooltip } from './CustomTooltip';

const GraphComponent = ({ data, xAxisLabel, dataKey, graphType, stroke, fill, type }) => {
  const { Component, Segment } = {
    line: {
      Component: LineChart,
      Segment: Line
    },
    bar: {
      Component: BarChart,
      Segment: Bar
    }
  }[graphType];
  return (
    <div className="graph-container">
      <ResponsiveContainer>
        <Component
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisLabel} height={60} tick={<CustomizedAxisTick />} />
          <YAxis type="number" domain={[0, 'dataMax']} allowDecimals={false}  />
          <Tooltip content={<CustomTooltip />} active />
          {/* <Legend /> */}
          <Segment dataKey={dataKey} stroke={stroke} fill={fill} type={type} />
        </Component>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphComponent;


// label={{ value: 'Frequency of Issue', angle: -90, position: 'insideLeft' }}
