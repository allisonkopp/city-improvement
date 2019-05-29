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
          <XAxis dataKey={xAxisLabel} />
          <YAxis type="number" domain={[0, 'dataMax']} allowDecimals={false} />
          <Tooltip active />
          <Legend />
          <Segment dataKey={dataKey} stroke={stroke} fill={fill} type={type} />
        </Component>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphComponent;

// const getIntroOfPage = label => {
//   if (label === 'Page A') {
//     return "Page A is about men's clothing";
//   }
//   if (label === 'Page B') {
//     return "Page B is about women's dress";
//   }
//   if (label === 'Page C') {
//     return "Page C is about women's bag";
//   }
//   if (label === 'Page D') {
//     return 'Page D is about household goods';
//   }
//   if (label === 'Page E') {
//     return 'Page E is about food';
//   }
//   if (label === 'Page F') {
//     return 'Page F is about baby food';
//   }
// };

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active) {
//     return (
//       <div className="custom-tooltip">
//         <p className="label">{`${label} : ${payload[0].value}`}</p>
//         <p className="intro">{getIntroOfPage(label)}</p>
//         <p className="desc">Anything you want can be displayed here.</p>
//       </div>
//     );
//   }

//   return null;
// };

// <Tooltip content={<CustomTooltip />} />
