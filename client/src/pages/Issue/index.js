import React, { Component } from 'react';
import { SectionWrapper } from '../../components';

class Issue extends Component {
  state = {
    issue: String(),
    comments: String(),
    date: Date(),
    photoUrl: String(),
    video: String()
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { addIssue } = this.props;
    addIssue && addIssue(this.state);
    this.setState({
      issue: String(),
      comments: String(),
      date: Date(),
      photoUrl: String(),
      videoUrl: String()
    });
  };

  handleFileUpload = e => {
    e.preventDefault();
    const uploadData = new FormData();
    const { handleUpload } = this.props;
    uploadData.append('imageUrl', this.state.photoUrl, this.state.photoUrl.name);
    handleUpload && handleUpload(this.state.photoUrl);
  };

  handleInputChange = field => e => this.setState({ [field]: e.target.value });

  handleFile = e => {
    const file = e.target.files[0];
    this.setState({ photoUrl: file });
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
              <button onClick={this.handleFileUpload}>Upload!</button>
            </div>
            <div>
              <label>Video: </label>
              <input type="text" onChange={this.handleInputChange('video')} />
            </div>
            <input type="submit" value="Submit Issue" />
          </div>
        </form>
      </SectionWrapper>
    );
  }
}

export default Issue;
