import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { SectionWrapper, CardContainer } from '../../components';
import { parseDate } from '../../utils';

import './Feed.css';

const FLOOD = require('../../assets/images/flood.png');
const DEBRIS = require('../../assets/images/debris.png');
const GARBAGE = require('../../assets/images/garbage.png');
const LIGHT = require('../../assets/images/light.png');
const OTHER = require('../../assets/images/other.png');
const POTHOLE = require('../../assets/images/pothole.jpg');
const TRAFFIC = require('../../assets/images/traffic.png');
const RECYCLING = require('../../assets/images/recycling.png');

const defaultPhotos = item => {
  if (item.issue === 'Flood') return FLOOD;
  else if (item.issue === 'Garbage') return GARBAGE;
  else if (item.issue === 'Recycling') return RECYCLING;
  else if (item.issue === 'Light Outage') return LIGHT;
  else if (item.issue === 'Debris') return DEBRIS;
  else if (item.issue === 'Pothole') return POTHOLE;
  else if (item.issue === 'Traffic Pattern') return TRAFFIC;
  else if (item.issue === 'Other') return OTHER;
};

class Feed extends Component {
  state = { data: [] };

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async _ => {
    const { data = {} } = await axios.get('/feed');
    const issues = Object.values(data.issues);
    const sortedIssues = issues.sort((x, y) => x.resolved - y.resolved);
    this.setState({ data: sortedIssues });
  };

  // refetch = _ => this.setState({ refetch: true });

  getStatus = item => (item.resolved ? 'Resolved' : 'Unresolved');

  toggleStatus = id => _ => axios.post(`/feed/update/${id}`, { resolved: true, dateResolved: Date() });

  render() {
    const { data } = this.state;

    return (
      <div className="feed-background">
        <SectionWrapper colDefs="card-group">
          {data.map(item => (
            <div>
              <CardContainer
                issue={item.issue}
                photoUrl={item.photoUrl || defaultPhotos(item)}
                comment={item.comments}
                date={moment(item.date).format('MM/DD/YYYY')}
                updatedDate={moment(item.dateResolved).format('MM/DD/YYYY')}
                dateDiff={moment(item.dateResolved).diff(moment(item.date), 'days')}
                status={this.getStatus(item)}
                toggleStatus={this.toggleStatus(item._id)}
                resolved={item.resolved}
              />
            </div>
          ))}
        </SectionWrapper>
      </div>
    );
  }
}

export default withRouter(Feed);
