import React, { Component } from 'react';
import axios from 'axios';
import { SectionWrapper, Card } from '../../components';

class Feed extends Component {
  state = { data: [] };

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async _ => {
    const { data = {} } = await axios.get('/feed');
    const issues = Object.values(data.issues);
    console.log(issues);
    this.setState({ data: issues });
  };

  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <SectionWrapper>
        <h1>User Feed</h1>
        <div className="card-deck">
          {this.state.data.map(item => (
            <Card issue={item.issue} photoUrl={item.photoUrl} comment={item.comment} />
          ))}
        </div>
      </SectionWrapper>
    );
  }
}

export default Feed;
