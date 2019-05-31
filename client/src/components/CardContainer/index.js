import React from 'react';
import './Card.css';

const formatPlural = n => {
  n = Number(n);
  if (n > 1) return `in ${n} days`;
  else if (n === 1) return `in ${n} day`;
  else return 'today';
};

// const formatPlural = n => {
//   return n > 1 ? `in ${n} days` : n === 1 ? `in ${n} day` : n === 0 ? 'today'
// };

const CardContainer = ({ photoUrl, issue, comment, date, updatedDate, status, resolved, toggleStatus, dateDiff }) => (
  <div className=" col-md-12 indv-card">
    <div className="card">
      <div className="card-horizontal">
        <div className="view">
          <img src={photoUrl} className="card-img-top" alt="" height="180vh" width="250vw" />
        </div>
        <div className="card-body">
          <h4 className="card-title">{issue}</h4>
          <p className="card-text">{comment}</p>
          {resolved ? (
            <p className="card-text">
              Date resolved: {updatedDate} <br />
              This issue was resolved {formatPlural({ dateDiff })}
            </p>
          ) : (
            <p className="card-text">Date submitted: {date}</p>
          )}
          <p className="card-text">Status: {status}</p>
        </div>
      </div>
      <div className="card-footer">
        {resolved ? (
          <small className="text-muted">Thank you for improving your city!</small>
        ) : (
          <small className="text-muted">
            Has this issue been resolved?
            <button className="btn btn-link" type="button" onClick={toggleStatus}>
              Yes
            </button>
          </small>
        )}
      </div>
    </div>
  </div>
);

export default CardContainer;
