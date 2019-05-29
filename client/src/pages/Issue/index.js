import React, { Component } from 'react';
import { get } from 'lodash';
import axios from 'axios';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { SectionWrapper, Modal, Form } from '../../components';
import { cityParser, parseDate } from '../../utils';
import { GOOGLE_API_KEY } from '../../config';
import './Issue.css';

// import { schema } from './Issue.schema';

const successMessage = 'Your issue has been successfully submitted.';
const successBtn = 'See results';
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
    videoUrl: String(),
    isOpen: false,
    modalContent: String()
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
  };

  handleUpload = file => {
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
    // document.querySelector('.custom-file-input').setAttribute('style', 'opacity:1');
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
      isOpen: true,
      modalContent: successMessage
    });
  };

  toggleModal = _ => {
    const { history } = this.props;
    this.setState({ isOpen: !this.state.isOpen });
    history.push('/results');
  };

  render() {
    const { issue, comments, date, isOpen, modalContent } = this.state;

    console.log(moment(Date()).format('MMMM Do YYYY, h:mm:ss A'));

    return (
      <SectionWrapper columnDefs="col form-wrapper ">
        {/* <Form schema={schema} handleSubmit={this.handleFormSubmit} /> */}
        <form onSubmit={this.handleFormSubmit} className="formContainer form-control">
          <h1 className="display-4 m-b-2 center-element">Report your issue</h1>
          <div className="form-group">
            <label>Type of Issue:</label>
            <select className="form-control" name="issues" onChange={this.handleInputChange('issue')} value={issue}>
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
          <div className="form-group">
            <label>Date: </label>
            <input
              className="form-control"
              type="text"
              onChange={this.handleInputChange('date')}
              value={parseDate(Date())}
            />
          </div>

          <div className="form-group">
            <label>Photo:</label>
            <div className="custom-file">
              <input className="custom-file-input" type="file" onChange={this.handleFile} />
              <span className="file-info">Upload a file</span>
            </div>
          </div>

          {/* <img src={photoUrl} alt="" height="100vh" /> */}

          <div className="form-group">
            <label>Comments:</label>
            <br />
            <textarea
              className="form-control"
              type="text"
              onChange={this.handleInputChange('comments')}
              value={comments}
              rows="5"
            />
          </div>
          <div className="center-element">
            <button className="btn btn-primary">
              Submit Issue
              {/* <input type="submit" value="Submit Issue" /> */}
            </button>
          </div>
        </form>
        <Modal
          isOpen={isOpen}
          content={modalContent}
          toggleModal={this.toggleModal}
          iconClass={'material-icons icn-person'}
          iconContent={'wb_sunny'}
          buttonContent={successBtn}
        />
      </SectionWrapper>
    );
  }
}

export default withRouter(Issue);
