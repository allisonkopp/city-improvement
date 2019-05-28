export const isLoggedIn = _ => !!sessionStorage.getItem('sessionToken');

export const errorBtn = 'Try again';

export const geolocationOptions = {
  enableHighAccuracy: true,
  maximumAge: 10000,
  timeout: 10000
};

const getCurrentPosition = _ =>
  new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, geolocationOptions));

export const loadPosition = async _ => {
  try {
    return await getCurrentPosition();
  } catch (error) {
    console.log('error getting position', error);
    return {
      coords: {
        longitude: -80.2044,
        latitude: 25.8028
      }
    };
  }
};

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

export const countIssues = (arr, issue) => arr && arr.filter(x => x.issue === issue).length;

//Fix this if there are multiple with same frequency
export const calculateMax = arr => arr.reduce((x, y) => (x.frequency > y.frequency ? x : y), arr[0]);

export const createFreqObj = (issue, frequency) => ({ issue, frequency });

export const createObjArr = (arr, dataArr) => arr.map(x => createFreqObj(x.issue, countIssues(dataArr, x.issue)));

export const getMonth = date => date.slice(date.indexOf('-') + 1, date.indexOf('-') + 3);

//clean this up
export const filterBySeason = (dataArr = [], seasonsArray = []) =>
  dataArr.filter(x => {
    if (seasonsArray.includes('Spring')) return Number(getMonth(x.date)) >= 3 && Number(getMonth(x.date)) <= 5;
    else if (seasonsArray.includes('Summer')) return Number(getMonth(x.date)) >= 6 && Number(getMonth(x.date)) <= 8;
    else if (seasonsArray.includes('Fall')) return Number(getMonth(x.date)) >= 9 && Number(getMonth(x.date)) <= 11;
    else if (seasonsArray.includes('Winter')) return Number(getMonth(x.date)) === 12 || Number(getMonth(x.date)) <= 2;
    else return x;
  });

export const filterByCity = (dataArr = [], citiesArr = []) => {
  dataArr.filter(x => {
    if (citiesArr.includes('Miami')) return x.city === 'Miami';
    else if (citiesArr.includes('Los Angeles')) return x.city === 'Los Angeles';
    else if (citiesArr.includes('New York')) return x.city === 'New York';
    else return x;
  });
};

// const getDefaultImages = issue => {
//   if (issue === "Flood") return
// }

export const popupRenderer = (props = {}) => {
  const picNode = props.photoUrl ? `<img src=${props.photoUrl} alt='image'>` : '<div />';
  return `
    <div>
    <h2>${props.issue}</h2>
    ${picNode}
  </div>
  `;
};

export const parseGeoJson = data => {
  if (!data.length) return;
  const features = data.map(item => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: item.location.coordinates
      // coordinates: [item.location.coordinates[1], item.location.coordinates[0]]
    },
    properties: {
      frequency: countIssues(data, item.issue),
      ...item
    }
  }));
  return {
    type: 'FeatureCollection',
    features
  };
};

export const cityParser = (string = String()) => {
  const stringFragment = string.split(',')[0];
  return stringFragment.slice(stringFragment.indexOf(' ')).trim();
};

export const groupBy = (arrayToGroup = [], name) =>
  arrayToGroup.reduce((acc, item) => {
    const type = item[name];
    acc[type] = acc[type] || [];
    acc[type].push(item);
    return acc;
  }, {});
