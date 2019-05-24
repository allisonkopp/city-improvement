import React, { Component } from 'react';
import { SectionWrapper, LineGraph } from '../../components';
import { labels, calculateMax, createObjArr } from '../../utils';
class Graph extends Component {
  state = {
    data: []
  };

  componentWillReceiveProps(props) {
    // console.log(props, this.props);
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

    return (
      <SectionWrapper>
        <LineGraph data={this.state.data} xAxisLabel={'issue'} dataKey={'frequency'} />
        <h3>The top issue is {getTopIssue()}</h3>
      </SectionWrapper>
    );
  }
}

export default Graph;
