import React, { Component } from 'react';
import axios from 'axios';
import { SectionWrapper, Modal } from '../../components';
import { withRouter } from 'react-router-dom';

const AVATAR = require('../../assets/images/avatar.png');

const modalContent = 'Under Construction';
const errorBtn = 'Go back';
class Profile extends Component {
  state = { name: String(), isOpen: true };

  toggleModal = _ => {
    this.setState({ isOpen: !this.state.isOpen });
    this.props.history.push('/feed');
  };

  fetchProfile = async _ => {
    const {
      data: { name, error }
    } = await axios.get('/user');
    if (error) return;
    this.setState({ name });
  };
  render() {
    const { name, isOpen } = this.state;
    return (
      <SectionWrapper columnDefs="col-md-8 col-md-offset-2">
        <h1 className="display-4">
          <img className="avatar img-circle hidden-xs-down" src={AVATAR} alt="avatar" />
          {name}
          <Modal
            isOpen={isOpen}
            content={modalContent}
            toggleModal={this.toggleModal}
            iconClass={'icn-person material-icons'}
            iconContent={'error'}
            buttonContent={errorBtn}
          />
        </h1>
      </SectionWrapper>
    );
  }
}

export default withRouter(Profile);
