import React, { useCallback, useMemo, useState } from 'react';
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

export const Representations = () => {
  const reprLists = useMemo(
    () => ({
      'ball+stick': [{ type: 'ball+stick' as const }],
      cartoon: [{ type: 'cartoon' as const }],
      'ribbon and line': [
        { type: 'ribbon' as const, param: { color: 'atomindex' } },
        { type: 'line' as const, param: { color: 'element' } },
      ],
      spacefill: [{ type: 'spacefill' as const, param: { color: 'element' } }],
      surface: [{ type: 'surface' as const, param: { color: 'element' } }],
    }),
    []
  );
  type ReprName = keyof typeof reprLists;

  const [reprName, setReprName] = useState<ReprName>('cartoon');

  const handleReprChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) =>
      setReprName(event.target.value as ReprName),
    []
  );

  return (
    <>
      <Stage width="600px" height="400px">
        <Component path="rcsb://4hhb" reprList={reprLists[reprName]} />
      </Stage>

      <select
        name="representation"
        value={reprName}
        onChange={handleReprChange}
      >
        {Object.keys(reprLists).map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </>
  );
};
