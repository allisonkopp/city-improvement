import React, { Component } from 'react';
import { SectionWrapper, LineGraph, BarGraph } from '../../components';
import { labels, calculateMax, createObjArr, filterBySeason } from '../../utils';

class Graph extends Component {
  state = {
    data: [],
    barData: [],
    season: String()
  };

  componentDidMount() {
    // this.createBarData();
  }

  componentWillReceiveProps(props) {
    this.createDataSet(props);
    this.createBarData(props);
  }

  createDataSet = props => {
    const dataSet = createObjArr(labels, props.issues);
    this.setState({ data: dataSet });
  };

  //fix hardcoded value
  createBarData = props => {
    const dataSet = createObjArr(labels, filterBySeason(props.issues, 'Spring'));
    this.setState({ barData: dataSet });
  };

  getSeason = e => this.setState({ season: e.target.name });

  render() {
    const getTopIssue = _ => {
      if (this.state.data.length) return calculateMax(this.state.data).issue;
    };

    return (
      <SectionWrapper>
        <h1>Regular data set</h1>
        <LineGraph data={this.state.data} xAxisLabel={'issue'} dataKey={'frequency'} />
        <p>The top issue is {getTopIssue()}</p>
        <h1>Data set by season</h1>
        <button name="Spring" type="button" onClick={this.getSeason}>
          Spring
        </button>
        <button name="Summer" type="button" onClick={this.getSeason}>
          Summer
        </button>
        <button name="Fall" type="button" onClick={this.getSeason}>
          Fall
        </button>
        <button name="Winter" type="button" onClick={this.getSeason}>
          Winter
        </button>
        <BarGraph data={this.state.barData} xAxisLabel={'issue'} dataKey={'frequency'} />
      </SectionWrapper>
    );
  }
}

export default Graph;
