import React, { useEffect, useState, RefCallback, useCallback } from 'react';
import { StageReactContext } from '../../hooks';
import { NGL, CameraState, getCameraState } from '../../utils';
import { Viewer } from './Viewer';

export interface StageProps {
  width: string;
  height: string;
  params?: Partial<NGL.StageParameters>;
  onCameraMove?: (cameraState: CameraState) => void;
}

export const Stage: React.FC<StageProps> = ({
  children,
  width,
  height,
  params,
  onCameraMove,
}) => {
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

  const handleCameraMove = useCallback(() => {
    if (stage && onCameraMove) {
      const cameraState = getCameraState(stage);
      onCameraMove(cameraState);
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
