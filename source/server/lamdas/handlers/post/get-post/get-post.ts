import createLambdaHandler from "../../../utils/create-lambda-handler/create-lambda-handler";

const { handler } = createLambdaHandler<{
  id: number;
}>({
  rawLambdaHandler: ({ callback, event: { id } }) => {
    console.log(id);
    callback(null, {});
  },
});

export default handler;
