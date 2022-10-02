import { Callback, Context } from "aws-lambda";

type RawLambdaHandlerArguments<TEvent> = {
  context: Context;
  event: TEvent;
  callback: Callback;
};

type CreateLambdaHandlerArguments<TEvent> = {
  rawLambdaHandler: (argument: RawLambdaHandlerArguments<TEvent>) => void;
};

const createLambdaHandler = <TEvent extends object, TResult = void>({
  rawLambdaHandler,
}: CreateLambdaHandlerArguments<TEvent>) => {
  return {
    // eslint-disable-next-line max-params
    handler: (
      event: TEvent,
      context: Context,
      callback: Callback,
    ): Promise<TResult> | void => {
      return rawLambdaHandler({ context, event, callback });
    },
  };
};

export default createLambdaHandler;
