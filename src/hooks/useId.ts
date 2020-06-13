import React, { useEffect } from 'react';

const ID_RADIX = 36;
const ID_LENGTH = 8;

const generateId = (): string =>
  Math.ceil(Math.random() * ID_RADIX ** ID_LENGTH)
    .toString(ID_RADIX)
    .padStart(ID_LENGTH, '0');

export const useId = (prefix = ''): string => {
  const idRef = React.useRef<string>('');

  useEffect(() => {
    idRef.current = `${prefix}${generateId()}`;
  }, [prefix]);

  return idRef.current;
};
