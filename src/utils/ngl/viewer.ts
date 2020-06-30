import { Vector3, Quaternion } from 'three';
import * as NGL from './nglTypes';

export type Position = Vector3;
export type Rotation = Quaternion;

export const DEFAULT_ROTATION: Rotation = new Quaternion(0, 0, 0, 1);

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

export const resetCameraState = (stage: NGL.Stage, duration?: number): void => {
  stage.animationControls.rotate(DEFAULT_ROTATION, duration);
  stage.autoView(duration);
};

export const applyCameraState = (
  stage: NGL.Stage,
  cameraState: CameraState
): void => {
  const prevCameraState = getCameraState(stage);
  if (!cameraState.position.equals(prevCameraState.position)) {
    const nextPosition = cameraState.position.clone().negate();
    stage.viewerControls.center(nextPosition);
  }
  if (!cameraState.rotation.equals(prevCameraState.rotation)) {
    stage.viewerControls.rotate(cameraState.rotation);
  }
  if (cameraState.distance !== prevCameraState.distance) {
    stage.viewerControls.distance(cameraState.distance);
  }
};
