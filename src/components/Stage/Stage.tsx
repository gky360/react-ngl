import React from 'react';
import { NGL } from '../../utils';

export interface StageProps {
  parameters?: Partial<NGL.StageParameters>;
}

export const Stage: React.FC<StageProps> = ({ parameters }) => {
  // eslint-disable-next-line no-console
  console.log(parameters);
  return <div>hello</div>;
};
