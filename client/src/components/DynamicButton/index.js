import React from 'react';

const DynamicButton = ({ label, active, onClick }) => {
  const variant = active ? 'btn-info' : 'btn-secondary';
  return (
    <button className={`layer-button btn ${variant} pull-sm-right`} onClick={onClick(label)}>
      {label}
    </button>
  );
};

export default DynamicButton;
