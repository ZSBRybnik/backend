/* eslint-disable max-params */
type RawResolverArguments<T extends object, K extends object> = {
  fields: K;
  argument: T;
};

type CreateResolverArguments<T extends object, K extends object> = {
  rawResolver: (argument: RawResolverArguments<T, K>) => Promise<unknown>;
};

const createResolver = <T extends object, K extends object>({
  rawResolver,
}: CreateResolverArguments<T, K>) => {
  return async (
    _parent: object,
    argument: T,
    _context: unknown,
    {
      fieldNodes,
    }: Record<string, unknown> & {
      fieldNodes: {
        selectionSet: Record<string, unknown> & {
          selections: {
            name: Record<string, unknown> & {
              value: unknown;
            };
          }[];
        };
      }[];
    },
  ) => {
    const fields = (
      fieldNodes.map(({ selectionSet: { selections } }) => {
        return selections.map(({ name: { value } }) => {
          return value;
        });
      })[0] as string[]
    ).reduce((accumulator, nextValue) => {
      (accumulator as { [key: string]: boolean })[nextValue] = true;
      return accumulator;
    }, {} as K);
    return await rawResolver({ fields, argument });
  };
};

export default createResolver;
