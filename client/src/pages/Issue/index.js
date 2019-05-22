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

    const { addIssue, handleUpload } = this.props;

    // const uploadData = new FormData();
    // uploadData.append('imageUrl', this.state.photoUrl);
    // console.log(uploadData.get('imageUrl'));
    // console.log(this.state.photoUrl, 'this is the photoURL');

    // handleUpload(uploadData.get('imageUrl'));

    addIssue && addIssue(this.state);
    this.setState({
      issue: String(),
      comments: String(),
      date: Date(),
      photoUrl: String(),
      videoUrl: String()
    });
  };

  // handleFileUpload = _ => {
  //   // e.preventDefault();
  //   const uploadData = new FormData();
  //   const { handleUpload } = this.props;

  //   uploadData.append('imageUrl', this.state.photoUrl);
  //   // uploadData.append('imageUrl', e.target.files[0]);
  //   console.log(this.state.photoUrl, this.state.photoUrl.name, 'photoUrl and name');
  //   // handleUpload && handleUpload(this.uploadData);
  //   handleUpload(uploadData).then(response => console.log(response));
  //   // this.setState({photoUrl: secure_url)
  //   // console.log(handleUpload(this.uploadData, 'please'));
  //   // console.log(uploadData, 'this is upload data');
  // };

  handleInputChange = field => e => this.setState({ [field]: e.target.value });

  handleFile = async e => {
    this.setState({ photoUrl: e.target.files[0] });

    const { handleUpload } = this.props;

    const uploadData = new FormData();
    await uploadData.append('imageUrl', this.state.photoUrl);
    await console.log(uploadData.get('imageUrl'));
    console.log(uploadData);

    console.log(this.state.photoUrl, 'this is the photoURL');
    const getResult = handleUpload(uploadData.get('imageUrl'));
    console.log(getResult, 'get result!');
    await this.setState({ photoUrl: getResult });
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

              {/* <button onClick={this.handleFileUpload}>Upload!</button> */}
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
