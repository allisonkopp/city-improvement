import React, { Component } from 'react';
import { get } from 'lodash';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { SectionWrapper } from '../../components';
import { cityParser } from '../../utils';
import { GOOGLE_API_KEY } from '../../config';

class Issue extends Component {
  state = {
    issue: String(),
    location: {
      type: 'Point',
      coordinates: [Number]
    },
    comments: String(),
    date: Date(),
    photoUrl: String(),
    video: String()
  };

  addIssue = async formData => {
    const { history, coords: { longitude: lng, latitude: lat } = {}, refetch } = this.props;
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
    );
    const region = get(data, ['plus_code', 'compound_code'], String());
    const city = cityParser(region);
    const postObj = { ...formData, location: { type: 'Point', coordinates: [lng, lat] }, city };
    const { error } = await axios.post('/issue/create', postObj);
    if (error) return history.push('/error');
    refetch && refetch();
    history.push('/results');
  };

  handleUpload = file => {
    console.log('file', file);
    axios
      .post('/issue/upload', file)
      .then(response => {
        this.setState({ photoUrl: response.data.secure_url });
      })
      .catch(err => console.error(err));
  };

  handleFile = async e => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append('imageUrl', e.target.files[0]);
    await this.handleUpload(uploadData);
  };

  handleInputChange = field => e => this.setState({ [field]: e.target.value });

  handleFormSubmit = e => {
    e.preventDefault();
    const { coords } = this.props;
    this.addIssue(this.state);
    this.setState({
      issue: String(),
      comments: String(),
      date: Date(),
      photoUrl: String(),
      videoUrl: String()
    });
  };

  render() {
    const { issue, comments, date, videoUrl } = this.state;
    return (
      <SectionWrapper>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <label>Type of Issue:</label>
            {/* <input type="text" onChange={this.handleInputChange('issue')} required /> */}
            <select name="issues" onChange={this.handleInputChange('issue')} value={issue}>
              <option value="Flood">Flood</option>
              <option value="Garbage">Garbage</option>
              <option value="Recycling">Recycling</option>
              <option value="Light Outage">Light Outage</option>
              <option value="Debris">Debris</option>
              <option value="Pothole">Pothole</option>
              <option value="Traffic Pattern">Traffic Pattern</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label>Comments:</label>
            <input type="text" onChange={this.handleInputChange('comments')} value={comments} />
          </div>
          <div>
            <label>Date: </label>
            <input type="text" onChange={this.handleInputChange('date')} value={date} />
          </div>
          <div>
            <div>
              <label>Photo: </label>
              <input type="file" onChange={this.handleFile} />
            </div>
            <div>
              <label>Video: </label>
              <input type="text" onChange={this.handleInputChange('videoUrl')} value={videoUrl} />
            </div>
            <input type="submit" value="Submit Issue" />
          </div>
        </form>
      </SectionWrapper>
    );
  }
}

export default withRouter(Issue);
