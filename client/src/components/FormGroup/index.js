import React from 'react';
import { Input, InputDropdown, InputGroup } from './Widgets';
const FormGroup = props => {
  const Component = {
    input: Input,
    dropdown: InputDropdown,
    group: InputGroup
  }[props.widget];
  return (
    <div className="form-group">
      <Component {...props} />
    </div>
  );
};

export default FormGroup;

// import React from 'react';

// const FormGroup = ({ type, label, placeholder, id, value, onChange, required }) => (
//   <div className="form-group">
//     <label>{label}</label>
//     <input
//       id={id}
//       className="form-control"
//       required={required}
//       type={type}
//       placeholder={placeholder}
//       value={type !== 'file' ? value : String()}
//       onChange={onChange(id)}
//     />
//   </div>
// );

// export default FormGroup;
