import React, { Component } from 'react';
import { SectionWrapper, LineGraph, BarGraph } from '../../components';
import { labels, calculateMax, createObjArr, filterBySeason } from '../../utils';

class Graph extends Component {
  state = {
    data: [],
    barData: [],
    season: 'Spring'
  };

  componentDidMount() {
    const { issues = [] } = this.props;
    this.createDataSet(issues);
    this.createBarData(issues);
  }

  createDataSet = issues => {
    const data = createObjArr(labels, issues);
    this.setState({ data });
  };

  //fix hardcoded value
  createBarData = issues => {
    const { season } = this.state;
    const barData = createObjArr(labels, filterBySeason(issues, season));
    this.setState({ barData });
  };

  getSeason = e => {
    const season = e.target.name;
    const { issues } = this.props;
    const barData = createObjArr(labels, filterBySeason(issues, season));
    this.setState({ season, barData });
  };

  render() {
    const { data } = this.state;
    const getTopIssue = _ => data.length && calculateMax(data).issue;
    const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
    return (
      <SectionWrapper>
        <h1>Regular data set</h1>
        <LineGraph data={this.state.data} xAxisLabel={'issue'} dataKey={'frequency'} />
        <p>The top issue is {getTopIssue()}</p>
        <h1>Data set by season</h1>
        {seasons.map(season => (
          <button name={season} type="button" onClick={this.getSeason}>
            {season}
          </button>
        ))}
        <BarGraph data={this.state.barData} xAxisLabel={'issue'} dataKey={'frequency'} />
      </SectionWrapper>
    );
  }
}

export default Graph;
