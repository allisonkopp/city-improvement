import React, { Component } from 'react';
import { SectionWrapper, LineGraph, BarGraph } from '../../components';
import { labels, calculateMax, createObjArr } from '../../utils';

class Graph extends Component {
  state = {
    data: [],
    barData: []
  };

  componentWillReceiveProps(props) {
    this.createDataSet(props);
  }

  createDataSet = props => {
    const dataSet = createObjArr(labels, props.issues);
    this.setState({ data: dataSet });
  };

  render() {
    const getTopIssue = _ => {
      if (this.state.data.length) return calculateMax(this.state.data).issue;
    };

    const test = _ => {
      if (this.props.issues.length) return this.props.issues.map(x => x.date.splice(x.date.splice.indexOf('-'), 2));
    };

    console.log(test(), 'please work');

    return (
      <SectionWrapper>
        <LineGraph data={this.state.data} xAxisLabel={'issue'} dataKey={'frequency'} />
        <h3>The top issue is {getTopIssue()}</h3>
        <BarGraph data={this.state.data} xAxisLabel={'issue'} dataKey={'frequency'} />
      </SectionWrapper>
    );
  }
}

export default Graph;
