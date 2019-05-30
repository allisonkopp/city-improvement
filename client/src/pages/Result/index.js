import React, { Component } from 'react';
import { SectionWrapper, GraphComponent, DynamicButton, Circle } from '../../components';
import { labels, calculateMax, createObjArr, filterBySeason, filterByCity, groupBy } from '../../utils';
import './Result.css';
import ProgressBar from 'progressbar.js';

const graphOptions = ['Area', 'Bar'];
const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
const cities = ['Miami', 'Los Angeles', 'New York'];
class Result extends Component {
  state = {
    data: [],
    rawData: this.props.issues,
    activeSeasons: ['Spring'],
    activeCities: 'Miami',
    activeGraph: 'Area',
    activeIndex: 0
    // pieData: []
  };

  componentDidMount() {
    const { issues = [] } = this.props;
    this.createDataSet(issues);
    // this.getPieData();
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

  // renderPieGraph = _ => {
  //   const { pieData } = this.state;
  //   return (
  //     <PieComponent
  //       activeIndex={this.state.activeIndex}
  //       dataKey={'resolved'}
  //       onMouseEnter={this.onPieEnter}
  //       data={pieData}
  //     />
  //   );
  // };

  // getStatus = status => this.state.rawData && this.state.rawData.filter(x => x.resolved === status).length;

  // getPieData = _ => {
  //   const pieData = [
  //     { name: 'Resolved', resolved: this.getStatus(true) },
  //     { name: 'Unresolved', resolved: this.getStatus(false) }
  //   ];
  //   this.setState({ pieData });
  // };

  // onPieEnter = (data, index) => {
  //   this.setState({
  //     activeIndex: index
  //   });
  // };

  render() {
    //console.log(this.getCity(25.766128199999997, -80.1961674));
    // console.log(this.getCity(40.715, -73.9843));
    // console.log(this.getCity(34.0522, -118.2437));

    const { data, activeGraph, activeSeasons, activeCities, rawData } = this.state;

    const groupByUser = _ => rawData && groupBy(rawData, 'user');
    const getTotalUsers = _ => Object.keys(groupByUser()).length;

    const getTotal = (arr, name) => arr.reduce((x, y) => x + y[name], 0);

    const getPercentage = _ => Math.round((getStatus(false) / getTotal(data, 'frequency')) * 100);

    const getTopIssue = _ => data.length && calculateMax(data).issue;

    const getStatus = status => this.state.rawData && this.state.rawData.filter(x => x.resolved === status).length;

    const getTopThree = _ => data && data.sort((x, y) => y.frequency - x.frequency).slice(0, 3);

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
              {areaActive && this.renderAreaGraph()}
              {barActive && this.renderBarGraph()}
            </div>
            <div className="toggle-container">
              <div>
                <p>Toggle seasons: </p>
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
              <div>
                <p>Toggle by city: </p>
                <div>
                  {cities.map(city => (
                    <DynamicButton
                      key={city}
                      label={city}
                      onClick={this.getCity}
                      active={activeCities.includes(city)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <div className="container">
            <div className="row">
              <div className="col">
                <h1>The takeaway</h1>
              </div>
            </div>
            <div className="row result-container">
              <div className="col-4">
                <div className="card">
                  <div className="card-body">
                    <h2>
                      {getTotal(data, 'frequency')} <br />
                      Total Issues
                    </h2>
                    <p>Submitted by {getTotalUsers()} users</p>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="card">
                  <div className="card-body">
                    <p>{getStatus(false)} issues have not been resolved </p>
                    <p>{getStatus(true)} issues been resolved </p>
                    <div className="progress blue" data-percentage={getPercentage()}>
                      <span className="progress-left">
                        <span className="progress-bar" />
                      </span>
                      <span className="progress-right">
                        <span className="progress-bar" />
                      </span>
                      <div className="progress-value">
                        <div>
                          {getPercentage() + '%'}
                          <br />
                          <span>unresolved</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="card">
                  <div className="card-body">
                    <p>The top three issues are:</p>
                    <ol>
                      {getTopThree().map((x, i) => (
                        <li>{x.issue}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <p>The top three are {getTopThree().map(x => x.issue)}</p> */}
        </SectionWrapper>
      </div>
    );
  }
}
export default Result;
