import React, { useEffect, useState, RefCallback, useCallback } from 'react';
import { StageReactContext } from '../../hooks';
import { NGL } from '../../utils';
import { Viewer } from './Viewer';

export interface StageProps {
  params?: Partial<NGL.StageParameters>;
  width: string;
  height: string;
}

export const Stage: React.FC<StageProps> = ({
  children,
  params: parameters,
  width,
  height,
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
      stage.setParameters(parameters);
    }
  }, [parameters, stage]);

  useEffect(() => {
    if (stage) {
      stage.setSize(width, height);
    }
  }, [height, stage, width]);

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
