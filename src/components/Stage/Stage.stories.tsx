import React, { useMemo, useState } from 'react';
import throttle from 'lodash/throttle';
import { CameraState, Position, Rotation } from '../../utils';
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

      <h4>Camera state</h4>
      <pre>
        {cameraState ? JSON.stringify(cameraState, undefined, 2) : 'Default'}
      </pre>
    </>
  );
};

export const ControllCameraState = () => {
  const THROTTLE_MS = 100;
  const cameraStateA = {
    position: new Position(7, 28, -3),
    rotation: new Rotation(0.8, 0.4, 0, -0.5),
    distance: -60,
  };
  const cameraStateB: CameraState = {
    position: new Position(-25, 145, 150),
    rotation: new Rotation(-0.6, 0.1, 0.5, 0.7),
    distance: -500,
  };
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
      <Stage
        width="600px"
        height="400px"
        cameraState={cameraState}
        onCameraMove={handleCameraMove}
      >
        <Component path="rcsb://4hhb" reprList={reprList} />
      </Stage>

      <div>
        <button type="button" onClick={() => setCameraState(cameraStateA)}>
          State A
        </button>
        <button type="button" onClick={() => setCameraState(cameraStateB)}>
          State B
        </button>
        <button type="button" onClick={() => setCameraState(undefined)}>
          Reset
        </button>
      </div>

      <h4>Camera state</h4>
      <pre>
        {cameraState ? JSON.stringify(cameraState, undefined, 2) : 'Default'}
      </pre>
    </>
  );
};
