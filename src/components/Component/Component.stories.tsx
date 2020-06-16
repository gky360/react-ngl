import React from 'react';
import { Stage } from '../Stage/Stage';
import { Component } from './Component';

export default {
  title: 'Components/Component',
  component: Component,
};

export const Usage = () => (
  <Stage width="600px" height="400px">
    <Component path="" />
  </Stage>
);
