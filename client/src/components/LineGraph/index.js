import React from 'react';
import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const LineGraph = ({ data, xAxisLabel, yAxisLabel, dataKey }) => {
  console.log('datatatt', data);
  return (
    <>
      {/* <ResponsiveContainer width={900} height="80%"> */}
      <LineChart
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
        <Tooltip active={true} />
        <Legend />
        <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
      </LineChart>
      {/* </ResponsiveContainer> */}
    </>
  );
};

export default LineGraph;