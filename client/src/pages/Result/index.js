import React, { Component } from 'react';
import { SectionWrapper, GraphComponent, DynamicButton } from '../../components';
import { labels, calculateMax, createObjArr, filterBySeason, filterByCity } from '../../utils';
import './Result.css';

const graphOptions = ['Line', 'Bar'];
const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
const cities = ['Miami', 'Los Angeles', 'New York'];
class Result extends Component {
  state = {
    data: [],
    activeSeasons: ['Spring'],
    activeCities: 'Miami',
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

  getCity = city => _ => {
    const { activeCities } = this.state;
    const cityActive = activeCities.includes(city);
    const newCities = cityActive ? activeCities.filter(c => c !== city) : [...activeCities, city];
    const { issues } = this.props;
    const data = createObjArr(labels, filterByCity(issues, newCities));
    this.setState({ activeCities: newCities, data });
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
    //console.log(this.getCity(25.766128199999997, -80.1961674));
    // console.log(this.getCity(40.715, -73.9843));
    // console.log(this.getCity(34.0522, -118.2437));

    const { data, activeGraph, activeSeasons, activeCities } = this.state;
    const getTopIssue = _ => data.length && calculateMax(data).issue;
    const lineActive = activeGraph === 'Line';
    const barActive = activeGraph === 'Bar';
    return (
      <>
        <SectionWrapper>
          <div>
            <div className="graph-header">
              <div>
                <h3>Issue Frequency</h3>
              </div>
              <div>
                {graphOptions.map(option => (
                  <DynamicButton
                    key={option}
                    label={option}
                    onClick={this.switchGraph}
                    active={activeGraph === option}
                  />
                ))}
              </div>
            </div>
            <div>
              {lineActive && this.renderLineGraph()}
              {barActive && this.renderBarGraph()}
            </div>
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <div>
            <h1>Results</h1>
            <h3>Type of Chart:</h3>
          </div>

          <div>
            {seasons.map(season => (
              <DynamicButton
                key={season}
                label={season}
                onClick={this.getSeason}
                active={activeSeasons.includes(season)}
              />
            ))}
          </div>

          <div>
            {cities.map(city => (
              <DynamicButton key={city} label={city} onClick={this.getCity} active={activeCities.includes(city)} />
            ))}
          </div>

          <p>The top issue is {getTopIssue()}</p>
        </SectionWrapper>
      </>
    );
  }
}
export default Result;
