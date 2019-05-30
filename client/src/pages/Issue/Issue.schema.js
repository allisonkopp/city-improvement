import { getDate } from '../../utils';

export const schema = {
  id: 'issueForm',
  formHeading: 'Report your issue',
  submitText: "Let's fix it",
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
      label: 'Date',
      type: 'text',
      id: 'date',
      widget: 'input',
      readOnly: true,
      placeholder: getDate
    },
    {
      label: 'Photo',
      type: 'file',
      id: 'photoUrl',
      widget: 'file'
    },
    {
      label: 'Comments',
      type: 'text',
      id: 'comments',
      widget: 'textarea',
      rows: 5
    }
  ]
};
