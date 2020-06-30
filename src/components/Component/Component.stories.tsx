import React, { useMemo } from 'react';
import { Stage } from '../Stage/Stage';
import { Component } from './Component';

export default {
  title: 'Components/Component',
  component: Component,
};

export const Usage = () => {
  const reprList = useMemo(() => [{ type: 'cartoon' as const }], []);
  return (
    <Stage width="600px" height="400px">
      <Component path="rcsb://4hhb" reprList={reprList} />
    </Stage>
  );
};
