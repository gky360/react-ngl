import React from 'react';
import { ComponentProps, Component } from '../Component/Component';
import { useComponent } from '../../hooks';
import { NGL } from '../../utils';

interface StructureComponentInnerProps {
  selection?: string;
}

const StructureComponentInner: React.FC<StructureComponentInnerProps> = ({
  selection,
}) => {
  const component = useComponent();
  if (!(component instanceof NGL.StructureComponent)) {
    throw new TypeError(
      'NGL Component loaded from given path is not a StructureComponent'
    );
  }
  console.log(component);

  return null;
};

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
