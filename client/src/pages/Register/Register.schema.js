export const schema = {
  id: 'registerForm',
  formHeading: 'Sign Up',
  submitText: 'Sign Up',
  fields: [
    {
      label: 'Name',
      type: 'text',
      id: 'name',
      placeholder: 'Name',
      required: true,
      widget: 'input'
    },
    {
      label: 'Email',
      type: 'email',
      id: 'email',
      placeholder: 'E-mail Address',
      required: true,
      widget: 'input'
    },
    {
      label: 'Password',
      type: 'password',
      id: 'password',
      required: true,
      widget: 'input'
    },
    {
      label: 'Confirm Password',
      type: 'password',
      id: 'confirmPassword',
      required: true,
      widget: 'input'
    }
  ]
};
