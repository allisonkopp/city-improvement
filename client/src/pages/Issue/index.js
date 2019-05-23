import React, { Component } from 'react';
import { SectionWrapper } from '../../components';
import axios from 'axios';

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

  addIssue = formData => {
    axios.post('/issue/create', formData);
    console.log('this is my form data', formData);
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
    this.getLocation();
    // console.log(locationData, 'this is the location');
    this.addIssue && this.addIssue(this.state);
    this.setState({
      issue: String(),
      location: {
        type: 'Point',
        coordinates: [Number]
      },
      comments: String(),
      date: Date(),
      photoUrl: String(),
      videoUrl: String()
    });
    console.log(this.state, 'this is the state');
  };

  getLocation = _ => {
    // e.preventDefault();
    if (navigator.geolocation) {
      const location_timeout = setTimeout(10000);
      navigator.geolocation.getCurrentPosition(
        position => {
          clearTimeout(location_timeout);

          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const coords = [];
          coords.push(lat, lng);
          console.log(coords);
          // if (coords) return coords;
          this.setState({
            location: {
              type: 'Point',
              coordinates: coords
            }
          });
        },
        error => {
          clearTimeout(location_timeout);
          console.log("this isn't working");
        }
      );
    }
  };

  render() {
    return (
      <SectionWrapper>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <label>Type of Issue:</label>
            <input type="text" onChange={this.handleInputChange('issue')} required />
          </div>
          <div>
            <label>Comments:</label>
            <input type="text" onChange={this.handleInputChange('comments')} />
          </div>
          <div>
            <label>Date: </label>
            <input type="text" onChange={this.handleInputChange('date')} />
          </div>
          <div>
            <div>
              <label>Photo: </label>
              <input type="file" onChange={this.handleFile} />
            </div>
            <div>
              <label>Video: </label>
              <input type="text" onChange={this.handleInputChange('videoUrl')} />
            </div>
            <input type="submit" value="Submit Issue" />
          </div>
        </form>
        <button onClick={this.getLocation}>GET LOCATION</button>
      </SectionWrapper>
    );
  }
}

export default Issue;
