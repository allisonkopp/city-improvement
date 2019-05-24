import React, { Component } from 'react';
import { SectionWrapper, LineGraph } from '../../components';

const labels = ['Flood', 'Garbage', 'Recycling', 'Light Outage', 'Debris', 'Pothole', 'Traffic Pattern', 'Other'];
const countIssues = (arr, issue) => arr.filter(x => x.issue === issue).length;
//Fix this if there are multiple with same frequency
const calculateMax = arr => arr.reduce((x, y) => (x.frequency > y.frequency ? x : y), arr[0]);

const createFreqObj = (issue, frequency) => {
  return {
    issue: issue,
    frequency: frequency
  };
};

const createObjArr = (arr, dataArr) => arr.map(x => createFreqObj(x, countIssues(dataArr, x)));
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
