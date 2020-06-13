import React from 'react';

export interface HelloProps {
  /**
   * Name to say hello. JSDoc appears in the story.
   * */
  name?: string;
}

/**
 * Displays a greeting to someone.
 * JSDoc appears in the story.
 */
export const Hello: React.FC<HelloProps> = ({ name = 'world' }) => (
  <div>
    Hello, <span className="hello-name">{name}</span>
  </div>
);
