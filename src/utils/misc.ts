export const mergeParams = <T extends object>(
  params: Partial<T>,
  defaultParams: T
): T => {
  const o: T = { ...defaultParams, ...params };
  Object.entries(defaultParams).forEach(([key, value]) => {
    if (value === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (o as any)[key] = (defaultParams as any)[key];
    }
  });
  return o;
};
