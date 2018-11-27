import React from 'react';

import { storiesOf } from '@storybook/react';

import Example from './';

storiesOf('Example', module)
  .add('to Storybook', () => <Example />);
