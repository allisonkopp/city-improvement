import React, { Component } from 'react';
import { get } from 'lodash';
import axios from 'axios';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { SectionWrapper, Modal, Form } from '../../components';
import { cityParser } from '../../utils';
import { GOOGLE_API_KEY } from '../../config';
import './Issue.css';
import { schema } from './Issue.schema';

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
    isOpen: false
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
    this.setState({ isOpen: true });
    refetch && refetch();
  };

  toggleModal = _ => {
    const { history } = this.props;
    this.setState({ isOpen: !this.state.isOpen });
    history.push('/results');
  };

  render() {
    const { isOpen } = this.state;

    console.log(moment(Date()).format('MMMM Do YYYY, h:mm:ss A'));

    return (
      <SectionWrapper columnDefs="col form-wrapper ">
        <Form schema={schema} handleSubmit={this.addIssue} />
        <Modal
          isOpen={isOpen}
          content={successMessage}
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
