import React from 'react';
import { Input, InputDropdown, InputGroup, FileInput } from './Widgets';
const FormGroup = props => {
  const Component = {
    input: Input,
    dropdown: InputDropdown,
    group: InputGroup,
    file: FileInput
  }[props.widget];
  return (
    <div className="form-group">
      <Component {...props} />
    </div>
  );
};

export default FormGroup;
