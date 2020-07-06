import { createContext, useContext } from 'react';
import { NGL, ReactNGLError } from '../utils';

export const ComponentReactContext = createContext<NGL.Component | undefined>(
  undefined
);

export const useComponent = (): NGL.Component => {
  const component = useContext(ComponentReactContext);
  if (!component) {
    throw new ReactNGLError(
      'useComponent hook can only be used in the children of <Component>'
    );
  }
  return component;
};
