import React, { Component } from 'react';
import { SectionWrapper, LineGraph } from '../../components';

const countIssues = (arr, issue) => arr.filter(x => x.issue === issue).length;

const createObj = (issue, frequency) => {
  return {
    issue: issue,
    frequency: frequency
  };
};

const createObjArr = (arr, dataArr) => arr.map(x => createObj(x, countIssues(dataArr, x)));

const labels = ['Flood', 'Garbage', 'Recycling', 'Light Outage', 'Debris', 'Pothole', 'Traffic Pattern', 'Other'];
class Graph extends Component {
  state = {
    issues: this.props.issues,
    data: []
  };

  createDataSet = _ => {
    const dataSet = createObjArr(labels, this.state.issues);
    this.setState({ data: dataSet });
    // return [
    //   createObj('Flood', countIssues(issues, 'Flood')),
    //   createObj('Garbage', countIssues(issues, 'Garbage')),
    //   createObj('Recycling', countIssues(issues, 'Recycling')),
    //   createObj('Light Outage', countIssues(issues, 'Light Outage')),
    //   createObj('Debris', countIssues(issues, 'Debris')),
    //   createObj('Pothole', countIssues(issues, 'Pothole')),
    //   createObj('Traffic Pattern', countIssues(issues, 'Traffic Pattern')),
    //   createObj('Other', countIssues(issues, 'Other'))
    // ];
  };

  componentDidMount() {
    this.createDataSet();
    // const dataSet = [
    //   {
    //     issue: 'Flood',
    //     frequency: countIssues(issues, 'Flood')
    //   },
    //   {
    //     issue: 'Garbage',
    //     frequency: countIssues(issues, 'Garbage')
    //   },
    //   {
    //     issue: 'Recycling',
    //     frequency: countIssues(issues, 'Recycling')
    //   },
    //   {
    //     issue: 'Light Outage',
    //     frequency: countIssues(issues, 'Light Outage')
    //   },
    //   {
    //     issue: 'Debris',
    //     frequency: countIssues(issues, 'Debris')
    //   },
    //   {
    //     issue: 'Pothole',
    //     frequency: countIssues(issues, 'Pothole')
    //   },
    //   {
    //     issue: 'Traffic Pattern',
    //     frequency: countIssues(issues, 'Traffic Pattern')
    //   },
    //   {
    //     issue: 'Other',
    //     frequency: countIssues(issues, 'Other')
    //   }
    // ];
    // this.setState({ data: dataSet });
  }

  render() {
    console.log(this.state.data, 'this is state.data');
    console.log(this.state.issues, 'this is state.issues');
    console.log(this.props.issues, 'this is prop.issues');
    return (
      <SectionWrapper>
        <h1>Graph here</h1>
        <LineGraph data={this.state.data} xAxisLabel={'issue'} dataKey={'Issues'} />
      </SectionWrapper>
    );
  }
}

export default Graph;
