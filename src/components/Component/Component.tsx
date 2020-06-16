import React from 'react';
import useAsyncEffect from '@n1ru4l/use-async-effect';
import { NGL } from '../../utils';
import { useStage } from '../../hooks';

export interface ComponentProps {
  path: string | File | Blob;
  loadFileParams?: Partial<NGL.StageLoadFileParams>;
  params?: Partial<NGL.ComponentParameters>;
  onLoadFailure?: (error: Error) => void;
}

export const Component: React.FC<ComponentProps> = ({
  path,
  loadFileParams,
  params,
  onLoadFailure,
}) => {
  const stage = useStage();

  useAsyncEffect(function* loadFiles(setCancelHandler, c) {
    const abortController = new AbortController();
    setCancelHandler(() => abortController.abort());
    let component;
    try {
      component = yield* c(stage.loadFile(path, loadFileParams));
    } catch (error) {
      if (onLoadFailure) {
        onLoadFailure(error);
      }
    }
    if (!component) {
      return;
    }
    // eslint-disable-next-line no-console
    console.log(component);
  }, []);

  // eslint-disable-next-line no-console
  console.log({ stage, path, loadFileParams, params });

  return null;
};
