import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { SectionWrapper, Form, Modal } from '../../components';
import { headers } from '../../assets/config';
import { schema } from './Login.schema';
import { errorBtn } from '../../utils';
class Login extends Component {
  state = { isOpen: false, modalContent: String() };

  toggleModal = _ => this.setState({ isOpen: !this.state.isOpen });

  handleLogin = async formData => {
    const { data: { error, session, message } = {} } = await axios.post('/login', formData, { headers });
    if (error) return this.setState({ isOpen: true, modalContent: message });
    sessionStorage.setItem('sessionToken', session.userId);
    this.props.history.push('/profile');
  };

  render() {
    const { isOpen, modalContent } = this.state;
    return (
      <SectionWrapper columnDefs="col-md-6 col-md-offset-3">
        <Form schema={schema} handleSubmit={this.handleLogin} />
        <Modal
          isOpen={isOpen}
          content={modalContent}
          toggleModal={this.toggleModal}
          iconClass={'icn-person material-icons'}
          iconContent={'error'}
          buttonContent={errorBtn}
        />
      </SectionWrapper>
    );
  }
}

export default withRouter(Login);
