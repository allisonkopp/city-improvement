import React from 'react';

const getIntroOfPage = label => {
  if (label === 'Flood') {
    return 'Flood reports are based off of areas prone to flooding. This can be from canal overflow, lake overflow, insufficient storm drainage, etc.';
  }
  if (label === 'Garbage') {
    return "Page B is about women's dress";
  }
  if (label === 'Recycling') {
    return "Page C is about women's bag";
  }
  if (label === 'Light Outage') {
    return 'Page D is about household goods';
  }
  if (label === 'Debris') {
    return 'Page E is about food';
  }
  if (label === 'Pothole') {
    return 'Page F is about baby food';
  }
  if (label === 'Traffic Pattern') {
    return 'Page F is about baby food';
  }
  if (label === 'Other') {
    return 'Page F is about baby food';
  }
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{label}</p>
        <p className="sub-label">{`Frequency: ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
      </div>
    );
  }
  return null;
};

export { CustomTooltip };
