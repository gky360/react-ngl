import React, { useEffect, useState } from 'react';
import useAsyncEffect from '@n1ru4l/use-async-effect';
import { NGL, RepresentationDescriptor, mergeParams } from '../../utils';
import { useStage } from '../../hooks';

// copied from https://github.com/arose/ngl/blob/d6a567ac/src/component/component.ts#L23
export const ComponentDefaultParameters = {
  name: '',
  status: '',
  visible: true,
};
export type ComponentParameters = typeof ComponentDefaultParameters;

const defaultPosition = new NGL.Vector3();
const defaultQuaternion = new NGL.Quaternion();
const defaultScale = 1;
const defaultTransform = new NGL.Matrix4();

export interface ComponentProps {
  path: string | File | Blob;
  loadFileParams?: Partial<NGL.StageLoadFileParams>;
  params?: Partial<NGL.ComponentParameters>;
  reprList?: RepresentationDescriptor[];
  position?: NGL.Vector3;
  quaternion?: NGL.Quaternion;
  scale?: number;
  transform?: NGL.Matrix4;
  onLoad?: (component: NGL.Component | undefined) => void;
  onLoadFailure?: (error: Error) => void;
}

export const Component: React.FC<ComponentProps> = ({
  path,
  loadFileParams,
  params = ComponentDefaultParameters,
  reprList = [],
  position = defaultPosition,
  quaternion = defaultQuaternion,
  scale = defaultScale,
  transform = defaultTransform,
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

  useEffect(() => {
    if (component) {
      const nextParams = mergeParams(params, ComponentDefaultParameters);
      if (nextParams.name !== component.parameters.name) {
        component.setName(nextParams.name);
      }
      if (nextParams.status !== component.parameters.status) {
        component.setStatus(nextParams.status);
      }
      if (nextParams.visible !== component.parameters.visible) {
        component.setVisibility(nextParams.visible);
      }
    }
  }, [component, params]);

  useEffect(() => {
    if (component) {
      component.removeAllRepresentations();
      reprList.forEach((repr) =>
        component.addRepresentation(repr.type, repr.params)
      );
    }
  }, [component, reprList]);

  useEffect(() => {
    if (component) {
      component.setPosition(position);
    }
  }, [component, position]);
  useEffect(() => {
    if (component) {
      component.setRotation(quaternion);
    }
  }, [component, quaternion]);
  useEffect(() => {
    if (component) {
      component.setScale(scale);
    }
  }, [component, scale]);
  useEffect(() => {
    if (component) {
      component.setTransform(transform);
    }
  }, [component, transform]);

  return null;
};
