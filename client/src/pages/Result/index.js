import React, { Component } from 'react';
import { SectionWrapper, GraphComponent, DynamicButton, PieComponent } from '../../components';
import { labels, calculateMax, createObjArr, filterBySeason, filterByCity, groupBy, getTotal } from '../../utils';
import './Result.css';
import Pulse from 'react-reveal/Pulse';

const graphOptions = ['Area', 'Bar'];
const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
const cities = ['Miami', 'Los Angeles', 'New York'];
class Result extends Component {
  state = {
    data: [],
    filteredIssues: [],
    activeSeasons: ['Spring'],
    activeCity: 'Miami',
    activeGraph: 'Area',
    activeIndex: 0,
    refetch: false,
    pieData: []
  };

  componentDidMount() {
    this.createDataSet();
    this.getPieData();
  }

  componentDidUpdate() {
    this.state.refetch && this.getPieData();
  }

  refetch = _ => this.setState({ refetch: true });

  createDataSet = _ => {
    const { issues } = this.props;
    const { activeCity } = this.state;
    const data = createObjArr(labels, filterByCity(issues, activeCity));
    const filteredIssues = issues.filter(issue => issue.city === activeCity);
    this.setState({ data, filteredIssues });
  };

  getSeason = season => _ => {
    const { activeSeasons, filteredIssues } = this.state;
    const seasonActive = activeSeasons.includes(season);
    const newSeasons = seasonActive ? activeSeasons.filter(s => s !== season) : [...activeSeasons, season];
    const data = createObjArr(labels, filterBySeason(filteredIssues, newSeasons));
    // const data = createSeasonArr(labels, filterBySeason(filteredIssues, newSeasons), newSeasons);
    this.setState({ activeSeasons: newSeasons, data });
  };

  getCity = e => {
    const { issues } = this.props;
    const city = e.target.value;
    const data = createObjArr(labels, filterByCity(issues, city));
    const filteredIssues = issues.filter(issue => issue.city === city);
    this.setState({ activeCity: city, data, filteredIssues });
    this.refetch();
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

  renderAreaGraph = _ => {
    const { data } = this.state;
    return (
      <GraphComponent
        stroke="#8884d8"
        fill="#3498DB"
        type="monotone"
        graphType="area"
        data={data}
        xAxisLabel={'issue'}
        dataKey={'frequency'}
      />
    );
  };

  renderPieGraph = _ => <PieComponent data={this.state.pieData} />;

  getStatus = status => this.props.issues.filter(x => x.resolved === status && x.city === this.state.activeCity);

  getTotalUsers = _ => Object.keys(groupBy(this.props.issues, 'user')).length;

  getTopThree = _ => this.state.data && this.state.data.sort((x, y) => y.frequency - x.frequency).slice(0, 3);

  getPieData = _ => {
    const pieData = [
      {
        name: 'Resolved',
        resolved: this.getStatus(true) ? this.getStatus(true).length : 0
      },
      {
        name: 'Unresolved',
        resolved: this.getStatus(false) ? this.getStatus(false).length : 100
      }
    ];
    this.setState({ pieData, refetch: false });
  };

  render() {
    const { activeGraph, activeSeasons, filteredIssues, activeCity } = this.state;

    const areaActive = activeGraph === 'Area';
    const barActive = activeGraph === 'Bar';

    return (
      <div className="background">
        <SectionWrapper columDefs={'col-lg-12'}>
          <div className="graph-wrapper">
            <div className="graph-header">
              <div>
                <h3>Issue Frequency</h3>
              </div>
              <div>
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
                <div>
                  <select className="form-control" onChange={this.getCity}>
                    {cities.map(city => (
                      <option className="form-control" value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div>
              {areaActive && this.renderAreaGraph()}
              {barActive && this.renderBarGraph()}
            </div>
            <div className="toggle-container">
              <div>
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
              </div>
            </div>
          </div>
        </SectionWrapper>
        <SectionWrapper className="result-background">
          <div className="container">
            <div className="row result-container">
              <div className="col-lg-3 col-md-12">
                <div className="card">
                  <div className="card-body total-issues-card">
                    <h2>Total Issues</h2>
                    <div className="number-wrapper">{this.props.issues && this.props.issues.length}</div>

                    <h3>Overall</h3>

                    <p>Submitted by {this.getTotalUsers()} users</p>
                    <hr />
                    <h3>
                      {filteredIssues && filteredIssues.length} <br />
                      <span id="filter-issues">from {activeCity}</span>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="card">
                  <div className="card-body pie-card">
                    <h2>Issue Status</h2>
                    {this.renderPieGraph()}
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-12">
                <div className="card top-issue-card">
                  <div className="card-body">
                    <h2>Top Issues</h2>
                    <h3>in {activeCity}</h3>
                    {/* <p>in {activeCity}</p> */}
                    <ol>
                      {this.getTopThree().map((x, i) => (
                        <li>{x.issue}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </div>
    );
  }
}
export default Result;
