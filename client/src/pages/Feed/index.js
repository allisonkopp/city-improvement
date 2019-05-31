import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { SectionWrapper, CardContainer } from '../../components';
import FLOOD from '../../assets/images/flood-1.jpg';
import DEBRIS from '../../assets/images/debris-1.png';
import GARBAGE from '../../assets/images/garbage-1.jpg';
import LIGHT from '../../assets/images/light-1.jpg';
import OTHER from '../../assets/images/other-1.jpg';
import POTHOLE from '../../assets/images/pothole-1.jpeg';
import TRAFFIC from '../../assets/images/traffic-1.jpg';
import RECYCLING from '../../assets/images/recycling-1.jpg';
import './Feed.css';

const defaultPhotos = ({ issue }) =>
  ({
    Flood: FLOOD,
    Garbage: GARBAGE,
    Recycling: RECYCLING,
    'Light Outage': LIGHT,
    Debris: DEBRIS,
    Pothole: POTHOLE,
    'Traffic Pattern': TRAFFIC,
    Other: OTHER
  }[issue]);

class Feed extends Component {
  state = { data: [], refetch: false };

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate() {
    this.state.refetch && this.getUserData();
  }

  getUserData = async _ => {
    const { data = {} } = await axios.get('/feed');
    const issues = Object.values(data.issues);
    const sortedIssues = issues.sort((x, y) => x.resolved - y.resolved);
    this.setState({ data: sortedIssues, refetch: false });
  };

  refetch = _ => this.setState({ refetch: true });

  getStatus = item => (item.resolved ? 'Resolved' : 'Unresolved');

  toggleStatus = id => async _ => {
    await axios.post(`/feed/update/${id}`, { resolved: true, dateResolved: Date() });
    this.refetch();
  };

  render() {
    const { data } = this.state;

    return (
      <div className="feed-background">
        <SectionWrapper colDefs="card-group">
          <h1>YOUR FEED</h1>

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

export default Feed;
