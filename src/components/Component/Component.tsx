import React, { useEffect, useState } from 'react';
import useAsyncEffect from '@n1ru4l/use-async-effect';
import { NGL, RepresentationDescriptor } from '../../utils';
import { useStage } from '../../hooks';

export interface ComponentProps {
  path: string | File | Blob;
  loadFileParams?: Partial<NGL.StageLoadFileParams>;
  params?: Partial<NGL.ComponentParameters>;
  reprList?: RepresentationDescriptor[];
  onLoad?: (component: NGL.Component | undefined) => void;
  onLoadFailure?: (error: Error) => void;
}

export const Component: React.FC<ComponentProps> = ({
  path,
  loadFileParams,
  params,
  reprList = [],
  onLoad,
  onLoadFailure,
}) => {
  const stage = useStage();
  const [component, setComponent] = useState<NGL.Component>();

  useAsyncEffect(
    function* loadFiles(setCancelHandler, c) {
      const abortController = new AbortController();
      setCancelHandler(() => abortController.abort());
      let nextComponent: NGL.Component | undefined;
      try {
        nextComponent = (yield* c(stage.loadFile(path, loadFileParams))) as
          | NGL.Component
          | undefined;
      } catch (error) {
        if (onLoadFailure) {
          onLoadFailure(error);
        }
      }
      if (nextComponent) {
        setComponent(nextComponent);
      }
    },
    [loadFileParams, onLoadFailure, path, stage]
  );

  useEffect(() => {
    if (component && onLoad) {
      onLoad(component);
    }
  }, [component, onLoad]);

  // TODO: set params
  // eslint-disable-next-line no-console
  console.log(params);

  useEffect(() => {
    if (component) {
      component.removeAllRepresentations();
      reprList.forEach((repr) =>
        component.addRepresentation(repr.type, repr.params)
      );
    }
  }, [component, reprList]);

  return null;
};
