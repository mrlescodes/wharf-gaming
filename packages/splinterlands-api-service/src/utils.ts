// TODO: Move to dedicate utils package

type QueryParams = {
  [key: string]: string | number | boolean | undefined;
};

export const buildQueryString = (
  params: QueryParams,
  paramMapping: { [key: string]: string } = {},
): string => {
  const data = Object.entries(params).reduce(
    (acc: Record<string, string>, [key, value]) => {
      if (value !== undefined) {
        const mappedKey = paramMapping[key] || key;
        acc[mappedKey] = String(value);
      }

      return acc;
    },
    {},
  );

  return new URLSearchParams(data).toString();
};
