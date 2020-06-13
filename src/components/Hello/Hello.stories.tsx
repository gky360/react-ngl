import React from 'react';
import { Hello } from './Hello';

export default {
  title: 'Components/Hello',
  component: Hello,
};

export const Default = () => <Hello />;

export const WithName = () => <Hello name="Tom" />;

export const LongName = () => <Hello name={`${'long '.repeat(20)}name`} />;
