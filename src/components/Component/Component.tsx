import React, { useEffect, useState } from 'react';
import useAsyncEffect from '@n1ru4l/use-async-effect';
import { NGL, RepresentationDescriptor } from '../../utils';
import { useStage } from '../../hooks';

export interface ComponentProps {
  path: string | File | Blob;
  loadFileParams?: Partial<NGL.StageLoadFileParams>;
  params?: Partial<NGL.ComponentParameters>;
  reprList?: RepresentationDescriptor[];
  onLoadFailure?: (error: Error) => void;
}

export const Component: React.FC<ComponentProps> = ({
  path,
  loadFileParams,
  params,
  reprList = [],
  onLoadFailure,
}) => {
  const stage = useStage();
  const [component, setComponent] = useState<NGL.Component>();

  useAsyncEffect(function* loadFiles(setCancelHandler, c) {
    const abortController = new AbortController();
    setCancelHandler(() => abortController.abort());
    let nextComponent;
    try {
      nextComponent = yield* c(stage.loadFile(path, loadFileParams));
    } catch (error) {
      if (onLoadFailure) {
        onLoadFailure(error);
      }
    }
    if (!nextComponent) {
      return;
    }
    // eslint-disable-next-line no-console
    console.log(nextComponent);
    setComponent(nextComponent);
  }, []);

  useEffect(() => {
    if (component) {
      component.removeAllRepresentations();
      reprList.forEach((repr) =>
        component.addRepresentation(repr.type, repr.params)
      );
    }
  }, [component, reprList]);

  // eslint-disable-next-line no-console
  console.log({ stage, path, loadFileParams, params });

  return null;
};
