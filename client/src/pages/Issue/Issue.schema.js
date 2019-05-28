export const schema = {
  id: 'issueForm',
  formHeading: 'Submit Your Issue',
  submitText: 'Submit',
  fields: [
    {
      label: 'Type of Issue',
      id: 'issues',
      options: ['Flood', 'Garbage', 'Recycling', 'Light Outage', 'Debris', 'Pothole', 'Traffic Pattern', 'Other'],
      widget: 'inputDropdown'
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
      id: 'comments',
      widget: 'input'
    }
  ]
};
