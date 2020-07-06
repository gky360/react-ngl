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
  isCameraStateEqual,
  getDefaultCameraState,
  CAMERA_STATE_NONE,
} from '../../utils';
import { Viewer } from './Viewer';

export interface StageProps {
  width: string;
  height: string;
  params?: Partial<NGL.StageParameters>;
  cameraState?: Partial<CameraState>;
  onCameraMove?: (cameraState: Partial<CameraState>) => void;
}

export const Stage: React.FC<StageProps> = ({
  children,
  width,
  height,
  params,
  cameraState,
  onCameraMove,
}) => {
  const lastCameraStateRef = useRef<Partial<CameraState>>();
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

  const handleComponentChange = useCallback(() => {
    setTimeout(() => {
      if (stage && lastCameraStateRef.current) {
        // apply latest camera state
        applyCameraState(stage, lastCameraStateRef.current);
      }
    });
  }, [stage]);

  useEffect(() => {
    if (stage) {
      stage.signals.componentAdded.add(handleComponentChange);
      stage.signals.componentRemoved.add(handleComponentChange);
    }
    return (): void => {
      if (stage) {
        stage.signals.componentAdded.remove(handleComponentChange);
        stage.signals.componentRemoved.remove(handleComponentChange);
      }
    };
  }, [handleComponentChange, stage]);

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
      const prevCameraState = lastCameraStateRef.current;
      if (!isCameraStateEqual(cameraState, prevCameraState)) {
        lastCameraStateRef.current = cameraState;
        if (cameraState) {
          applyCameraState(stage, cameraState);
        }
      }
    }
  }, [cameraState, stage]);

  const handleCameraMove = useCallback(() => {
    if (stage && onCameraMove) {
      const currentCameraState = getCameraState(stage);
      const cameraStateOrNone = isCameraStateEqual(
        currentCameraState,
        getDefaultCameraState(stage)
      )
        ? CAMERA_STATE_NONE
        : currentCameraState;
      onCameraMove(cameraStateOrNone);
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
