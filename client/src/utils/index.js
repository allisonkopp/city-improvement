export const isLoggedIn = _ => !!sessionStorage.getItem('sessionToken');

export const labels = [
  { issue: 'Flood', color: '#85C1E9' },
  { issue: 'Garbage', color: '#3498DB' },
  { issue: 'Recycling', color: '#76D7C4' },
  { issue: 'Light Outage', color: '#FFC300' },
  { issue: 'Debris', color: '#F39C12' },
  { issue: 'Pothole', color: '#239B56' },
  { issue: 'Traffic Pattern', color: '#F39C12' },
  { issue: 'Other', color: '#154360 ' }
];

export const countIssues = (arr, issue) => arr.filter(x => x.issue === issue).length;
//Fix this if there are multiple with same frequency
export const calculateMax = arr => arr.reduce((x, y) => (x.frequency > y.frequency ? x : y), arr[0]);

export const createFreqObj = (issue, frequency) => {
  return {
    issue: issue,
    frequency: frequency
  };
};

export const createObjArr = (arr, dataArr) => arr.map(x => createFreqObj(x.issue, countIssues(dataArr, x.issue)));

export const getMonth = date => date.slice(date.indexOf('-') + 1, date.indexOf('-') + 3);

//clean this up
export const filterBySeason = (dataArr, season) => {
  return dataArr.filter(x => {
    if (season === 'Spring') return Number(getMonth(x.date)) >= 3 && Number(getMonth(x.date)) <= 5;
    else if (season === 'Summer') return Number(getMonth(x.date)) >= 6 && Number(getMonth(x.date)) <= 8;
    else if (season === 'Fall') return Number(getMonth(x.date)) >= 9 && Number(getMonth(x.date)) <= 11;
    else if (season === 'Winter') return Number(getMonth(x.date)) === 12 || Number(getMonth(x.date)) <= 2;
    else console.log('error');
  });
};

export const popupRenderer = (props = {}) => `
  <div>
    <h2>${props.issue}</h2>
    <img src=${props.photoUrl} alt='image'>
  </div>
`;

export const parseGeoJson = data => {
  if (!data.length) return;
  const features = data.map(item => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [item.longitude, item.latitude]
    },
    properties: { ...item }
  }));
  return {
    type: 'FeatureCollection',
    features
  };
};
