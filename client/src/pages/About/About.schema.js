import { isLoggedIn } from '../../utils';

export const schema = {
  headingText: 'About Us',
  items: [
    {
      content: 'City Improvement is a community where '
    },
    {
      content:
        'Sed dictum dolor vitae dignissim scelerisque. Ut tincidunt, tortor at accumsan eleifend, tellus lectus vestibulum nibh, accumsan sagittis turpis nisl eu mauris.Mauris ut laoreet sapien.Nam suscipit, dui at condimentum accumsan, dui sapien tincidunt.'
    }
  ],
  buttons: [{ path: !isLoggedIn ? '/register' : '/issue', text: "Let's get started" }]
};
