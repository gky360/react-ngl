import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  RefCallback,
} from 'react';
import { StageReactContext } from '../../hooks';
import {
  NGL,
  CameraState,
  getCameraState,
  applyCameraState,
  resetCameraState,
  isCameraStateEqual,
} from '../../utils';
import { Viewer } from './Viewer';

export interface StageProps {
  width: string;
  height: string;
  params?: Partial<NGL.StageParameters>;
  cameraState?: CameraState;
  onCameraMove?: (cameraState: CameraState) => void;
}

const CAMERA_STATE_RESET_DURATION = 150;

export const Stage: React.FC<StageProps> = ({
  children,
  width,
  height,
  params,
  cameraState,
  onCameraMove,
}) => {
  const prevCameraStateRef = useRef<CameraState>();
  const [stage, setStage] = useState<NGL.Stage>();

  const stageElementRef: RefCallback<HTMLElement> = useCallback((element) => {
    if (element) {
      const currentStage = new NGL.Stage(element);
      setStage(currentStage);
    }
  }, []);

  useEffect(() => {
    return (): void => {
      if (stage) {
        stage.dispose();
      }
    };
  }, [stage]);

  useEffect(() => {
    if (stage) {
      stage.setParameters(params);
    }
  }, [params, stage]);

  useEffect(() => {
    if (stage) {
      stage.setSize(width, height);
    }
  }, [height, stage, width]);

  useEffect(() => {
    if (stage) {
      const prevCameraState = prevCameraStateRef.current;
      if (!isCameraStateEqual(cameraState, prevCameraState)) {
        prevCameraStateRef.current = cameraState;
        if (cameraState) {
          applyCameraState(stage, cameraState);
        } else {
          resetCameraState(stage, CAMERA_STATE_RESET_DURATION);
        }
      }
    }
  }, [cameraState, stage]);

  const handleCameraMove = useCallback(() => {
    if (stage && onCameraMove) {
      onCameraMove(getCameraState(stage));
    }
  }, [onCameraMove, stage]);

  useEffect(() => {
    if (stage) {
      stage.viewerControls.signals.changed.add(handleCameraMove);
    }
    return (): void => {
      if (stage) {
        stage.viewerControls.signals.changed.remove(handleCameraMove);
      }
    };
  }, [handleCameraMove, stage]);

  return (
    <>
      <div ref={stageElementRef} style={{ width, height }} />
      {stage && (
        <StageReactContext.Provider value={stage}>
          <Viewer>{children}</Viewer>
        </StageReactContext.Provider>
      )}
    </>
  );
};
