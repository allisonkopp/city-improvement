import React, { Component } from 'react';
import { SectionWrapper } from '../../components';
import axios from 'axios';

class Issue extends Component {
  state = {
    issue: String(),
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
    // this.setState({ photoUrl: getResult });
    // console.log(getResult, 'get result!');
    // console.log(this.state.photoUrl);
  };

  handleInputChange = field => e => this.setState({ [field]: e.target.value });

  handleFormSubmit = e => {
    e.preventDefault();
    this.addIssue && this.addIssue(this.state);
    this.setState({
      issue: String(),
      comments: String(),
      date: Date(),
      photoUrl: String(),
      videoUrl: String()
    });
    console.log(this.state, 'this is the state');
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
      </SectionWrapper>
    );
  }
}

export default Issue;
