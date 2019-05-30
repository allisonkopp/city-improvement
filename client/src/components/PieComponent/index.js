// import React from 'react';
// import { PieChart, Pie } from 'recharts';
// import { RenderActiveShape } from './RenderActiveShape';

// const PieComponent = (activeIndex, data, dataKey, onPieEnter) => (
//   <PieChart width={400} height={400}>
//     <Pie
//       activeIndex={activeIndex}
//       activeShape={RenderActiveShape}
//       data={data}
//       cx={200}
//       cy={200}
//       innerRadius={60}
//       outerRadius={80}
//       fill="#8884d8"
//       dataKey={dataKey}
//       onMouseEnter={onPieEnter}
//     />
//   </PieChart>
// );

// export default PieComponent;

import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 }
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieComponent = _ => (
  <PieChart width={800} height={400}>
    <Pie
      data={data}
      cx={120}
      cy={200}
      innerRadius={60}
      outerRadius={80}
      fill="#8884d8"
      paddingAngle={5}
      dataKey="resolved"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
  </PieChart>
);

export default PieComponent;
