import React from 'react';
import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// const countIssues = (arr, issue) => arr.filter(x => x.issue === issue).length;

const LineGraph = ({ data, xAxisLabel, yAxisLabel, dataKey }) => {
  console.log('datatatt', data);
  return (
    <>
      {/* <ResponsiveContainer> */}
      <LineChart
        width={730}
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
        <YAxis dataKey={yAxisLabel} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
      </LineChart>
      {/* </ResponsiveContainer> */}
    </>
  );
};

export default LineGraph;
