import React, { useEffect } from 'react';
import { useComponent } from '../../hooks';
import { NGL } from '../../utils';

export interface StructureComponentInnerProps {
  selection?: string;
}

export const StructureComponentInner: React.FC<StructureComponentInnerProps> = ({
  selection = '',
  children,
}) => {
  const component = useComponent();
  if (!(component instanceof NGL.StructureComponent)) {
    throw new TypeError(
      'NGL Component loaded from given path is not a StructureComponent'
    );
  }

  useEffect(() => {
    component.setSelection(selection);
  }, [component, selection]);

  return <>{children}</>;
};
