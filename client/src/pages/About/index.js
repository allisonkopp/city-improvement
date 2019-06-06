import React, { Component } from 'react';
import { SectionWrapper, StaticContent, Modal } from '../../components';
import { schema } from './About.schema';

const modalContent = 'Under Construction';
const errorBtn = 'Go back';
class About extends Component {
  state = { isOpen: true };

  toggleModal = _ => {
    this.setState({ isOpen: !this.state.isOpen });
    this.props.history.push('/');
  };
  render() {
    const { isOpen } = this.state;
    return (
      <div className="main-background">
        <SectionWrapper columnDefs="col-md-8 col-md-offset-2">
          <StaticContent schema={schema} />
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

export default About;
