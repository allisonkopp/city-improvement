import React, { Component } from 'react';
import { PieChart, Pie } from 'recharts';
import { RenderActiveShape } from './RenderActiveShape';

class PieComponent extends Component {
  state = { activeIndex: 0 };
  onPieEnter = (_, index) => this.setState({ activeIndex: index });
  render() {
    const { activeIndex } = this.state;
    const { data } = this.props;
    return (
      <PieChart width={400} height={400}>
        <Pie
          activeShape={RenderActiveShape}
          activeIndex={activeIndex}
          data={data}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          onMouseEnter={this.onPieEnter}
          dataKey="resolved"
        />
      </PieChart>
    );
  }
}

export default PieComponent;
