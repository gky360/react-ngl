import React, { useRef, useEffect } from 'react';
import { StageReactContext, useElement } from '../../hooks';
import { NGL } from '../../utils';

export interface StageProps {
  parameters?: Partial<NGL.StageParameters>;
}

export const Stage: React.FC<StageProps> = ({ parameters, children }) => {
  const stageRef = useRef<NGL.Stage>();

  const [stageElement, stageElementRef] = useElement();

  useEffect(() => {
    if (stageRef.current) {
      stageRef.current.dispose();
    }
    if (stageElement) {
      stageRef.current = new NGL.Stage(stageElement);
    }
  }, [stageElement]);

  useEffect(() => {
    if (stageElement) {
      if (!stageRef.current) {
        // eslint-disable-next-line no-console
        console.warn('NGL Stage is not created yet');
        return;
      }
      stageRef.current.setParameters(parameters);
    }
  }, [parameters, stageElement]);

  return (
    <>
      <div ref={stageElementRef} />
      {stageRef.current && (
        <StageReactContext.Provider value={stageRef.current}>
          {children}
        </StageReactContext.Provider>
      )}
    </>
  );
};
