import React from 'react';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './GraphComponent.css';

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
      <Component
        width={900}
        height={250}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <XAxis dataKey={xAxisLabel} />
        <YAxis type="number" domain={[0, 'dataMax']} allowDecimals={false} />
        <Tooltip active />
        <Legend />
        <Segment dataKey={dataKey} stroke={stroke} fill={fill} type={type} />
      </Component>
    </div>
  );
};

export default GraphComponent;
