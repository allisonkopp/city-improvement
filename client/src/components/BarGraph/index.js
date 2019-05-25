import React from 'react';
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const labels = [
  { issue: 'Flood', color: '#85C1E9' },
  { issue: 'Garbage', color: '#3498DB' },
  { issue: 'Recycling', color: '#76D7C4' },
  { issue: 'Light Outage', color: '#FFC300' },
  { issue: 'Debris', color: '#F39C12' },
  { issue: 'Pothole', color: '#239B56' },
  { issue: 'Traffic Pattern', color: '#F39C12' },
  { issue: 'Other', color: '#154360 ' }
];

const BarGraph = ({ data, xAxisLabel, yAxisLabel, dataKey, color }) => {
  return (
    <>
      <BarChart
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
        <YAxis dataKey={yAxisLabel} type="number" domain={[0, 'dataMax']} allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} fill={'#3498DB '} />
      </BarChart>
    </>
  );
};

export default BarGraph;
