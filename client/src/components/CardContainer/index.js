import React from 'react';
import './Card.css';

const CardContainer = ({ photoUrl, issue, comment, date, updatedDate, status, resolved, toggleStatus, dateDiff }) => (
  <div className="card col-4">
    <img src={photoUrl} className="card-img-top" alt="" height="100vh" />
    <div className="card-body">
      <h5 className="card-title">{issue}</h5>
      <p className="card-text">{comment}</p>
      {resolved ? (
        <p>
          Date resolved: {updatedDate} and time taken {dateDiff}{' '}
        </p>
      ) : (
        <p>Date submitted: {date}</p>
      )}
      <p>Status: {status}</p>
    </div>
    <div className="card-footer">
      {resolved ? (
        <small className="text-muted">Thank you for improving your city!</small>
      ) : (
        <small className="text-muted">
          Has this issue been resolved?
          <button type="button" onClick={toggleStatus}>
            Yes
          </button>
        </small>
      )}
    </div>
  </div>
);

export default CardContainer;
