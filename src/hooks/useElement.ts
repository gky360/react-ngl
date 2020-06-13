import { useState, useCallback, RefCallback } from 'react';

export const useElement = (): [
  HTMLElement | null,
  RefCallback<HTMLElement>
] => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  const elementRef: RefCallback<HTMLElement> = useCallback((instance) => {
    setElement(instance);
  }, []);

  return [element, elementRef];
};
