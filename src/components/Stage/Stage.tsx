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
} from '../../utils';
import { Viewer } from './Viewer';

export interface StageProps {
  width: string;
  height: string;
  params?: Partial<NGL.StageParameters>;
  cameraState?: Partial<CameraState>;
  onCameraMove?: (cameraState: CameraState) => void;
}

const setupStage = (
  stage: NGL.Stage,
  setInitialized: (isInitialized: boolean) => void
): void => {
  stage.signals.componentAdded.addOnce(() =>
    setTimeout(() => setInitialized(true))
  );
};

const teardownStage = (stage: NGL.Stage): void => {
  stage.dispose();
};

export const Stage: React.FC<StageProps> = ({
  children,
  width,
  height,
  params,
  cameraState,
  onCameraMove,
}) => {
  const prevCameraStateRef = useRef<Partial<CameraState>>();
  const [isInitialized, setInitialized] = useState(false);
  const [stage, setStage] = useState<NGL.Stage>();

  const stageElementRef: RefCallback<HTMLElement> = useCallback((element) => {
    if (element) {
      const currentStage = new NGL.Stage(element);
      setStage(currentStage);
    }
  }, []);

  useEffect(() => {
    if (stage) {
      setupStage(stage, setInitialized);
    }
    return (): void => {
      if (stage) {
        teardownStage(stage);
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
      if (isInitialized && !isCameraStateEqual(cameraState, prevCameraState)) {
        prevCameraStateRef.current = cameraState;
        if (cameraState) {
          applyCameraState(stage, cameraState);
        }
      }
    }
  }, [cameraState, isInitialized, stage]);

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
