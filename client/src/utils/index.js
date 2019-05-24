export const isLoggedIn = _ => !!sessionStorage.getItem('sessionToken');

export const labels = [
  'Flood',
  'Garbage',
  'Recycling',
  'Light Outage',
  'Debris',
  'Pothole',
  'Traffic Pattern',
  'Other'
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

export const createObjArr = (arr, dataArr) => arr.map(x => createFreqObj(x, countIssues(dataArr, x)));
