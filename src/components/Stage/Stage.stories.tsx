import React, { useMemo, useState, useCallback } from 'react';
import throttle from 'lodash/throttle';
import { NGL, CameraState, Position, Rotation } from '../../utils';
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
  const THROTTLE_MS = 300;
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
  const THROTTLE_MS = 300;
  const cameraStates = useMemo(
    () => ({
      'Camera State A': {
        position: new Position(7, 28, -3),
        rotation: new Rotation(0.8, 0.4, 0, -0.5),
        distance: -60,
      },
      'Camera State B': {
        position: new Position(-25, 50, 50),
        rotation: new Rotation(-0.6, 0.1, 0.5, 0.7),
        distance: -300,
      },
      Reset: undefined,
    }),
    []
  );
  type CameraStateName = keyof typeof cameraStates;
  const reprList = useMemo(() => [{ type: 'cartoon' as const }], []);

  const [cameraStateName, setCameraStateName] = useState<CameraStateName>(
    'Camera State A'
  );
  const [cameraState, setCameraState] = useState<CameraState | undefined>(
    cameraStates['Camera State A']
  );

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
        {(Object.keys(cameraStates) as CameraStateName[]).map((name) => (
          <label key={name} htmlFor={name}>
            <input
              type="radio"
              id={name}
              name="camera-state-name"
              value={name}
              checked={name === cameraStateName}
              onChange={() => {
                setCameraStateName(name);
                setCameraState(cameraStates[name]);
              }}
            />
            {name}
          </label>
        ))}
      </div>

      <h4>Camera state</h4>
      <pre>
        {cameraState ? JSON.stringify(cameraState, undefined, 2) : 'Default'}
      </pre>
    </>
  );
};

export const SelectCameraType = () => {
  const CAMERA_TYPES = ['perspective', 'orthographic', 'stereo'] as const;
  type CameraType = typeof CAMERA_TYPES[number];

  const [cameraType, setCameraType] = useState<CameraType>('perspective');
  const stageParams = useMemo(() => ({ cameraType }), [cameraType]);
  const reprList = useMemo(() => [{ type: 'cartoon' as const }], []);

  const handleCameraTypeChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCameraType(event.target.value as CameraType);
    },
    []
  );

  return (
    <>
      <Stage width="600px" height="400px" params={stageParams}>
        <Component path="rcsb://4hhb" reprList={reprList} />
      </Stage>

      <select
        name="camera-type"
        value={cameraType}
        onChange={handleCameraTypeChange}
      >
        {CAMERA_TYPES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </>
  );
};
