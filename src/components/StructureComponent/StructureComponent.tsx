import React from 'react';
import { ComponentProps, Component } from '../Component/Component';
import {
  StructureComponentInner,
  StructureComponentInnerProps,
} from './StructureComponentInner';

export interface StructureComponentProps
  extends StructureComponentInnerProps,
    ComponentProps {}

export const StructureComponent: React.FC<StructureComponentProps> = ({
  children,
  selection,
  ...componentProps
}) => (
  <>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...componentProps}>
      <StructureComponentInner selection={selection}>
        {children}
      </StructureComponentInner>
    </Component>
  </>
);
