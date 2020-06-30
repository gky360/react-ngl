import React, { useEffect, useRef, useState } from 'react';
import isEqual from 'lodash/isEqual';
import useAsyncEffect from '@n1ru4l/use-async-effect';
import { NGL } from '../../utils';
import { useStage } from '../../hooks';

export interface ComponentProps {
  path: string | File | Blob;
  loadFileParams?: Partial<NGL.StageLoadFileParams>;
  params?: Partial<NGL.ComponentParameters>;
  reprList?: NGL.RepresentationDescriptor[];
  onLoadFailure?: (error: Error) => void;
}

const defaultReprList: NGL.RepresentationDescriptor[] = [];

export const Component: React.FC<ComponentProps> = ({
  path,
  loadFileParams,
  params,
  reprList = defaultReprList,
  onLoadFailure,
}) => {
  const prevReprListRef = useRef<NGL.RepresentationDescriptor[]>(
    defaultReprList
  );
  const [component, setComponent] = useState<NGL.Component>();
  const stage = useStage();

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
      const prevReprList = prevReprListRef.current;
      const len = Math.max(prevReprList.length, reprList.length);
      for (let i = 0; i < len; i += 1) {
        if (!isEqual(prevReprList[i], reprList[i])) {
          const prevReprElem = component.reprList[i];
          if (prevReprElem) {
            component.removeRepresentation(prevReprElem);
          }
          if (reprList[i]) {
            component.addRepresentation(reprList[i].type, reprList[i].params);
          }
        }
      }
      prevReprListRef.current = reprList;
    }
  }, [component, reprList]);

  // eslint-disable-next-line no-console
  console.log({ stage, path, loadFileParams, params });

  return null;
};
