import React, { useMemo } from 'react';
import { Stage } from '../Stage/Stage';
import { StructureComponent } from './StructureComponent';

export default {
  title: 'Components/StructureComponent',
  component: StructureComponent,
};

export const Usage = () => {
  const reprList = useMemo(() => [{ type: 'cartoon' as const }], []);
  return (
    <Stage width="600px" height="400px">
      <StructureComponent path="rcsb://4hhb" reprList={reprList} />
    </Stage>
  );
};
