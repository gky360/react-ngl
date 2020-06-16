import React from 'react';
import { NGL } from '../../utils';
import { useStage } from '../../hooks';

interface ComponentProps {
  path: string | File | Blob;
  loadFileParams?: Partial<NGL.StageLoadFileParams>;
  params?: Partial<NGL.ComponentParameters>;
}

export const Component: React.FC<ComponentProps> = ({
  path,
  loadFileParams,
  params,
}) => {
  const stage = useStage();

  // eslint-disable-next-line no-console
  console.log({ stage, path, loadFileParams, params });

  return null;
};
