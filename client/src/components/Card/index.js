import React from 'react';

const Card = (photoUrl, issue, comment) => (
  <div className="card">
    <img src={photoUrl} className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 className="card-title">{issue}</h5>
      <p className="card-text">{comment}</p>
    </div>
  </div>
);

export default Card;
