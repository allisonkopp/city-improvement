export const schema = {
  id: 'issueForm',
  formHeading: 'Submit Your Issue',
  submitText: 'Submit',
  fields: [
    {
      label: 'Type of Issue',
      id: 'issue',
      options: [
        { id: 'flood', value: 'Flood', display: 'Flood' },
        { id: 'garbage', value: 'Garbage', display: 'Garbage' },
        { id: 'recycling', value: 'Recycling', display: 'Recycling' },
        { id: 'light-outage', value: 'Light Outage', display: 'Light Outage' },
        { id: 'debris', value: 'Debris', display: 'Debris' },
        { id: 'pothole', value: 'Pothole', display: 'Pothole' },
        { id: 'traffic-pattern', value: 'Traffic Pattern', display: 'Traffic Pattern' },
        { id: 'other', value: 'Other', display: 'Other' }
      ],
      widget: 'dropdown'
    },
    {
      label: 'Comments',
      type: 'text',
      id: 'comments',
      widget: 'input'
    },
    {
      label: 'Date',
      type: 'text',
      id: 'date',
      widget: 'input'
    },
    {
      label: 'Photo',
      type: 'file',
      id: 'photoUrl',
      widget: 'file'
    }
  ]
};
