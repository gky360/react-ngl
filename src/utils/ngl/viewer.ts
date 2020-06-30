import * as NGL from './nglTypes';

export type Position = NGL.Vector3;
export type Rotation = NGL.Quaternion;

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
