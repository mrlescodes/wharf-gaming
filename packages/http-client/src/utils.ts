export const buildQueryString = (
  params: Record<string, any>,
  paramMapping: Record<string, string> = {},
) => {
  const data = Object.entries(params).reduce(
    (acc: Record<string, any>, [key, value]) => {
      if (value !== undefined) {
        const mappedKey = paramMapping[key] || key;
        acc[mappedKey] = value;
      }
      return acc;
    },
    {},
  );

  return new URLSearchParams(data).toString();
};
