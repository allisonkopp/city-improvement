import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup } from '..';

class Form extends Component {
  constructor(props) {
    super(props);
    const { schema: { fields = [] } = {} } = props;
    this.state = fields.reduce((acc, field) => {
      acc[field.id] = String();
      return acc;
    }, {});
  }
  handleInputChange = ({ id, value }) => this.setState({ [id]: value });
  handleUpload = async ({ id, value }) => {
    const uploadData = new FormData();
    uploadData.append('imageUrl', value);
    const { data: { secure_url } = {} } = await axios.post('/issue/upload', uploadData);
    this.setState({ [id]: secure_url });
  };
  onSubmit = e => {
    e.preventDefault();
    const { handleSubmit } = this.props;
    const state = this.state;
    handleSubmit(state);
    const newState = Object.keys(state).reduce((acc, key) => {
      acc[key] = String();
      return acc;
    }, {});
    this.setState(newState);
  };
  render() {
    const { formHeading, schema: { id, fields = [], submitText } = {} } = this.props;
    return (
      <form onSubmit={this.onSubmit} id={id}>
        <h1 className="display-4 m-b-2">{formHeading}</h1>
        {fields.map(field => (
          <FormGroup
            {...field}
            onChange={this.handleInputChange}
            onUpload={this.handleUpload}
            value={this.state[field.id]}
          />
        ))}
        <button className="btn btn-primary" type="submit">
          {submitText}
        </button>
      </form>
    );
  }
}

export default Form;
