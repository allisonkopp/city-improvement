// import React from 'react';
// import { BarChart, LineChart, Line, ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// const BarGraph = ({ data, xAxisLabel, yAxisLabel, dataKey, color }) => {
//   return (
//     <>
//       <BarChart
//         width={900}
//         height={250}
//         data={data}
//         margin={{
//           top: 5,
//           right: 30,
//           left: 20,
//           bottom: 5
//         }}
//       >
//         <XAxis dataKey={xAxisLabel} />
//         <YAxis dataKey={yAxisLabel} type="number" domain={[0, 'dataMax']} allowDecimals={false} />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey={dataKey} fill="#3498DB " />
//       </BarChart>
//     </>
//   );
// };

// const LineGraph = ({ data, xAxisLabel, dataKey }) => {
//   return (
//     <>
//       {/* <ResponsiveContainer width={900} height="80%"> */}
//       <LineChart
//         width={900}
//         height={250}
//         data={data}
//         margin={{
//           top: 5,
//           right: 30,
//           left: 20,
//           bottom: 5
//         }}
//       >
//         <XAxis dataKey={xAxisLabel} />
//         <YAxis type="number" domain={[0, 'dataMax']} allowDecimals={false} />
//         <Tooltip active={true} />
//         <Legend />
//         <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
//       </LineChart>
//       {/* </ResponsiveContainer> */}
//     </>
//   );
// };

// export { BarGraph, LineGraph };
