import React from 'react';
import { useStage } from '../../hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ViewerProps {}

export const Viewer: React.FC<ViewerProps> = ({ children }) => {
  const stage = useStage();
  const { viewer } = stage;

  // eslint-disable-next-line no-console
  console.log(viewer);

  return <>{children}</>;
};
