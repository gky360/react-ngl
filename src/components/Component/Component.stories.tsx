import React, { useMemo } from 'react';
import { Stage } from '../Stage/Stage';
import { Component } from './Component';
import { NGL } from '../../utils';

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

export const Representations = () => {
  const positionA = useMemo(() => new NGL.Vector3(-20 + 40, -20 + 40, 0), []);
  const positionB = useMemo(() => new NGL.Vector3(-20 + -40, -20 + 40, 0), []);
  const positionC = useMemo(() => new NGL.Vector3(-20 + 40, -20 + -40, 0), []);
  const positionD = useMemo(() => new NGL.Vector3(-20 + -40, -20 + -40, 0), []);

  const reprListA = useMemo(() => [{ type: 'ball+stick' as const }], []);
  const reprListB = useMemo(
    () => [
      { type: 'ribbon' as const, param: { color: 'atomindex' } },
      { type: 'line' as const, param: { color: 'element' } },
    ],
    []
  );
  const reprListC = useMemo(
    () => [{ type: 'spacefill' as const, param: { color: 'element' } }],
    []
  );
  const reprListD = useMemo(
    () => [{ type: 'surface' as const, param: { color: 'element' } }],
    []
  );

  return (
    <Stage width="600px" height="400px">
      <Component path="rcsb://4hhb" position={positionA} reprList={reprListA} />
      <Component path="rcsb://4hhb" position={positionB} reprList={reprListB} />
      <Component path="rcsb://4hhb" position={positionC} reprList={reprListC} />
      <Component path="rcsb://4hhb" position={positionD} reprList={reprListD} />
    </Stage>
  );
};
