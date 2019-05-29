import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Form, Modal, SectionWrapper } from '../../components';
import { headers } from '../../assets/config';
import { schema } from './Register.schema';
import { errorBtn } from '../../utils';

class Register extends Component {
  state = { isOpen: false, modalContent: String() };

  handleRegister = async formData => {
    const {
      data: { error, message }
    } = await axios.post('/register', formData, { headers });
    if (error) return this.setState({ isOpen: true, modalContent: message });
    this.props.history.push('/login');
  };

  toggleModal = _ => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { isOpen, modalContent } = this.state;
    return (
      <div className="main-background">
        <SectionWrapper columnDefs="col-md-6 col-md-offset-3">
          <Form schema={schema} handleSubmit={this.handleRegister} />
          <Modal
            isOpen={isOpen}
            content={modalContent}
            toggleModal={this.toggleModal}
            iconClass={'icn-person material-icons'}
            iconContent={'error'}
            buttonContent={errorBtn}
          />
        </SectionWrapper>
      </div>
    );
  }
}

export default withRouter(Register);
