import { createContext, useContext } from 'react';
import { NGL, ReactNGLError } from '../utils';

export const StageReactContext = createContext<NGL.Stage | undefined>(
  undefined
);

export const useStage = (): NGL.Stage => {
  const stage = useContext(StageReactContext);
  if (!stage) {
    throw new ReactNGLError(
      'useStage hook can only be used in the children of <Stage>'
    );
  }
  return stage;
};
