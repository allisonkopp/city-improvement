import React, { Component } from 'react';
import { SectionWrapper, GraphComponent, DynamicButton } from '../../components';
import { labels, calculateMax, createObjArr, filterBySeason } from '../../utils';

class Graph extends Component {
  state = {
    data: [],
    activeSeasons: ['Spring'],
    activeGraph: 'Line'
  };

  componentDidMount() {
    const { issues = [] } = this.props;
    this.createDataSet(issues);
  }

  createDataSet = issues => {
    const { season } = this.state;
    const data = createObjArr(labels, filterBySeason(issues, season));
    this.setState({ data });
  };

  getSeason = season => _ => {
    const { activeSeasons } = this.state;
    const seasonActive = activeSeasons.includes(season);
    const newSeasons = seasonActive ? activeSeasons.filter(s => s !== season) : [...activeSeasons, season];
    const { issues } = this.props;
    const data = createObjArr(labels, filterBySeason(issues, newSeasons));
    this.setState({ activeSeasons: newSeasons, data });
  };

  switchGraph = graphType => _ => {
    const { activeGraph } = this.state;
    if (graphType === activeGraph) return;
    this.setState({ activeGraph: graphType });
  };

  renderBarGraph = _ => {
    const { data } = this.state;
    return <GraphComponent fill="#3498DB" graphType="bar" data={data} xAxisLabel={'issue'} dataKey={'frequency'} />;
  };

  renderLineGraph = _ => {
    const { data } = this.state;
    return (
      <GraphComponent
        stroke="#8884d8"
        type="monotone"
        graphType="line"
        data={data}
        xAxisLabel={'issue'}
        dataKey={'frequency'}
      />
    );
  };

  render() {
    const { data, activeGraph, activeSeasons } = this.state;
    const getTopIssue = _ => data.length && calculateMax(data).issue;
    const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
    const graphOptions = ['Line', 'Bar'];
    const lineActive = activeGraph === 'Line';
    const barActive = activeGraph === 'Bar';
    return (
      <SectionWrapper>
        <h1>Regular data set</h1>
        <p>The top issue is {getTopIssue()}</p>
        <h3>Graph Options</h3>
        {graphOptions.map(option => (
          <DynamicButton key={option} label={option} onClick={this.switchGraph} active={activeGraph === option} />
        ))}
        <h1>Data set by season</h1>
        {seasons.map(season => (
          <DynamicButton key={season} label={season} onClick={this.getSeason} active={activeSeasons.includes(season)} />
        ))}
        <br />
        <div>
          {lineActive && this.renderLineGraph()}
          {barActive && this.renderBarGraph()}
        </div>
      </SectionWrapper>
    );
  }
}

export default Graph;
