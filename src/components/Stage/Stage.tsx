import React, { useRef, useEffect, useState, useCallback } from 'react';
import { NGL } from '../../utils';

const StageReactContext = React.createContext<NGL.Stage | undefined>(undefined);

export interface StageProps {
  parameters?: Partial<NGL.StageParameters>;
}

export const Stage: React.FC<StageProps> = ({ parameters, children }) => {
  const [stageElement, setStageElement] = useState<HTMLDivElement | null>(null);
  const stageRef = useRef<NGL.Stage>();

  const stageElementRef = useCallback(
    (element: HTMLDivElement | null): void => {
      setStageElement(element);
    },
    []
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (stage) {
      stage.dispose();
    }
    if (stageElement) {
      stageRef.current = new NGL.Stage(stageElement);
    }
  }, [stageElement]);

  useEffect(() => {
    if (!stageRef.current) {
      // eslint-disable-next-line no-console
      console.warn('NGL Stage is not created yet');
      return;
    }
    stageRef.current.setParameters(parameters);
  }, [parameters]);

  return (
    <>
      <div ref={stageElementRef} />
      <StageReactContext.Provider value={stageRef.current}>
        {children}
      </StageReactContext.Provider>
    </>
  );
};
