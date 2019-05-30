import React from 'react';

const DynamicButton = ({ label, active, onClick, additionalClass }) => {
  const variant = active ? 'btn-primary' : 'btn-secondary';
  return (
    <button className={`layer-button btn ${variant} pull-sm-right ${additionalClass}`} onClick={onClick(label)}>
      {label}
    </button>
  );
};

export default DynamicButton;
