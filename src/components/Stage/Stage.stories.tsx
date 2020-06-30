import React, { useMemo, useState } from 'react';
import throttle from 'lodash/throttle';
import { CameraState } from '../../utils';
import { Component } from '../Component/Component';
import { Stage } from './Stage';

export default {
  title: 'Components/Stage',
  component: Stage,
};

export const Usage = () => {
  const reprList = useMemo(() => [{ type: 'cartoon' as const }], []);
  return (
    <Stage width="600px" height="400px">
      <Component path="rcsb://4hhb" reprList={reprList} />
    </Stage>
  );
};

export const CaptureCameraState = () => {
  const THROTTLE_MS = 100;
  const reprList = useMemo(() => [{ type: 'cartoon' as const }], []);

  const [cameraState, setCameraState] = useState<CameraState>();

  const handleCameraMove = useMemo(
    () =>
      throttle(
        (nextCameraState: CameraState) => setCameraState(nextCameraState),
        THROTTLE_MS
      ),
    []
  );

  return (
    <>
      <Stage width="600px" height="400px" onCameraMove={handleCameraMove}>
        <Component path="rcsb://4hhb" reprList={reprList} />
      </Stage>
      <pre>
        {cameraState ? JSON.stringify(cameraState, undefined, 2) : 'N/A'}
      </pre>
    </>
  );
};
