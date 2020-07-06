import React, { useMemo, useState } from 'react';
import { Stage } from '../Stage/Stage';
import { StructureComponent } from './StructureComponent';
import { CAMERA_STATE_NONE } from '../../utils';

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

export const SetSelection = () => {
  const reprList = useMemo(() => [{ type: 'cartoon' as const }], []);
  const [tmpSelection, setTmpSelection] = useState('');
  const [selection, setSelection] = useState('');

  return (
    <>
      <Stage width="600px" height="400px" cameraState={CAMERA_STATE_NONE}>
        <StructureComponent
          path="rcsb://3pqr"
          reprList={reprList}
          selection={selection}
        />
      </Stage>

      <input
        type="text"
        value={tmpSelection}
        placeholder="selection e.g. 1-90/0"
        onChange={(event) => setTmpSelection(event.target.value)}
      />
      <button type="button" onClick={() => setSelection(tmpSelection)}>
        apply
      </button>
    </>
  );
};
