import React from 'react';
import classNames from 'classnames';

const Input = ({
  type,
  label,
  placeholder,
  id,
  value,
  onChange,
  required,
  classes = [],
  defaultValue,
  defaultChecked,
  isChecked,
  readOnly,
  rows,
  cols
}) => (
  <>
    <label>{label}</label>
    <textarea
      id={id}
      className={classNames('form-control', ...classes)}
      required={required}
      type={type}
      checked={isChecked}
      defaultChecked={defaultChecked}
      placeholder={placeholder}
      value={type !== 'file' ? value : String()}
      onChange={e => onChange({ id, value: e.target.value })}
      defaultValue={defaultValue}
      readOnly={readOnly}
      rows={rows}
      cols={cols}
    />
  </>
);

export default Input;
