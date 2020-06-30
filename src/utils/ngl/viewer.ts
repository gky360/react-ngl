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

export const getCameraState = (stage: NGL.Stage): CameraState => {
  const { position, rotation } = stage.viewerControls;
  const distance = stage.viewer.camera.position.z;
  return {
    position,
    rotation,
    distance,
  };
};

export const applyCameraState = (
  stage: NGL.Stage,
  cameraState: CameraState,
  withoutDispatch = false
): void => {
  const { viewerControls } = stage;
  const prevCameraState = getCameraState(stage);
  let isChanged = false;
  if (!cameraState.position.equals(prevCameraState.position)) {
    // see also https://github.com/arose/ngl/blob/7bf7e355/src/controls/viewer-controls.ts#L153
    viewerControls.viewer.translationGroup.position.copy(cameraState.position);
    isChanged = true;
  }
  if (!cameraState.rotation.equals(prevCameraState.rotation)) {
    // see also https://github.com/arose/ngl/blob/7bf7e355/src/controls/viewer-controls.ts#L199
    viewerControls.viewer.rotationGroup.setRotationFromQuaternion(
      cameraState.rotation
    );
    isChanged = true;
  }
  if (cameraState.distance !== prevCameraState.distance) {
    // see also https://github.com/arose/ngl/blob/7bf7e355/src/controls/viewer-controls.ts#L173
    viewerControls.viewer.camera.position.z = Math.min(
      -1,
      cameraState.distance
    );
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

export const resetCameraState = (stage: NGL.Stage): void => {
  const cameraState = {
    position: stage.getCenter(),
    rotation: DEFAULT_ROTATION,
    distance: stage.getZoom(),
  };
  applyCameraState(stage, cameraState, true);
};

export const isCameraStateEqual = (
  a: CameraState | undefined,
  b: CameraState | undefined
): boolean => {
  if (a === undefined || b === undefined) {
    return a === b;
  }
  return (
    a.position.equals(b.position) &&
    a.rotation.equals(b.rotation) &&
    a.distance === b.distance
  );
};
