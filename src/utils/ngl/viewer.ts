import { Vector3 } from 'three';
import * as NGL from './nglTypes';

export const Position = NGL.Vector3;
export type Position = NGL.Vector3;

export const Rotation = NGL.Quaternion;
export type Rotation = NGL.Quaternion;

export const DEFAULT_ROTATION: Rotation = new Rotation(0, 0, 0, 1);

export interface CameraState {
  position: Position;
  rotation: Rotation;
  distance: number;
}

export const CAMERA_STATE_NONE: Partial<CameraState> = {};

export const getCameraState = (stage: NGL.Stage): CameraState => {
  const { position, rotation } = stage.viewerControls;
  const distance = stage.viewer.camera.position.z;
  return {
    position,
    rotation,
    distance,
  };
};

export const getDefaultPosition = (stage: NGL.Stage): Vector3 =>
  stage.getCenter().negate();

export const getDefaultDistance = (stage: NGL.Stage): number => stage.getZoom();

export const getDefaultCameraState = (stage: NGL.Stage): CameraState => ({
  position: getDefaultPosition(stage),
  rotation: DEFAULT_ROTATION,
  distance: getDefaultDistance(stage),
});

export const applyCameraState = (
  stage: NGL.Stage,
  cameraState: Partial<CameraState>,
  withoutDispatch = false
): void => {
  const { viewerControls } = stage;
  const prevCameraState = getCameraState(stage);
  let isChanged = false;

  const position = cameraState.position || getDefaultPosition(stage);
  if (!position.equals(prevCameraState.position)) {
    // see also https://github.com/arose/ngl/blob/7bf7e355/src/controls/viewer-controls.ts#L153
    viewerControls.viewer.translationGroup.position.copy(position);
    isChanged = true;
  }

  const rotation = cameraState.rotation || DEFAULT_ROTATION;
  if (!rotation.equals(prevCameraState.rotation)) {
    // see also https://github.com/arose/ngl/blob/7bf7e355/src/controls/viewer-controls.ts#L199
    viewerControls.viewer.rotationGroup.setRotationFromQuaternion(rotation);
    isChanged = true;
  }

  const distance = cameraState.distance || getDefaultDistance(stage);
  if (distance !== prevCameraState.distance) {
    // see also https://github.com/arose/ngl/blob/7bf7e355/src/controls/viewer-controls.ts#L173
    viewerControls.viewer.camera.position.z = Math.min(-1, distance);
    viewerControls.viewer.updateZoom();
    isChanged = true;
  }

  if (isChanged) {
    // see also https://github.com/arose/ngl/blob/7bf7e355/src/controls/viewer-controls.ts#L72
    viewerControls.viewer.requestRender();
    if (!withoutDispatch) {
      viewerControls.signals.changed.dispatch();
    }
  }
};

export const isCameraStateEqual = (
  a: Partial<CameraState> | undefined,
  b: Partial<CameraState> | undefined
): boolean => {
  if (a === undefined || b === undefined) {
    return a === b;
  }
  const isPositionEqual =
    a.position && b.position
      ? a.position.equals(b.position)
      : a.position === b.position;
  const isRotationEqual =
    a.rotation && b.rotation
      ? a.rotation.equals(b.rotation)
      : a.rotation === b.rotation;
  return isPositionEqual && isRotationEqual && a.distance === b.distance;
};
