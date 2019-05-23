import React from 'react';

const PopUp = (issue, imgUrl, close) => (
  <div>
    <div>
      <h2>{issue}</h2>
      <img src={imgUrl} alt="" />
      <button onClick={close}>X</button>
    </div>
  </div>
);

export default PopUp;
