/* eslint-disable max-params */
type RawResolverArguments<T extends object, K extends object> = {
  fields: K;
  argument: T;
};

type CreateResolverArguments<T extends object, K extends object> = {
  rawResolver: (argument: RawResolverArguments<T, K>) => Promise<any>;
};

const createResolver = <T extends object, K extends object>({
  rawResolver,
}: CreateResolverArguments<T, K>) => {
  return async (
    _parent: object,
    argument: T,
    _context: any,
    { fieldNodes }: any,
  ) => {
    const fields = (
      fieldNodes.map(({ selectionSet: { selections } }: any) => {
        return selections.map(({ name: { value } }: any) => {
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
