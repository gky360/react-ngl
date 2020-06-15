import React, { useEffect } from 'react';
import { useStage } from '../../hooks';

interface ViewerProps {
  width: number;
  height: number;
}

export const Viewer: React.FC<ViewerProps> = ({ children, width, height }) => {
  const stage = useStage();
  const { viewer } = stage;

  useEffect(() => {
    viewer.setSize(width, height);
  }, [viewer, height, width]);

  return <>{children}</>;
};
