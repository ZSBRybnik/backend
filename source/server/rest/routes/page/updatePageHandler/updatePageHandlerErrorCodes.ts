import { NextFunction } from "express";
import postgreSQLClient from "~root/source/server/clients/postgreSQLClient/postgreSQLClient";
import Request from "../../../types/request/request";
import Response from "../../../types/response/response";
import getFromJsonRedisClient from "../../../utils/getFromJsonRedisClient/getFromJsonRedisClient";
import { AddPageHandlerBody } from "../addPageHandler/addPageHandler";

type UpdatePageHandlerErrorCodesArguments = {
  request: Pick<Request, "jsonRedisClient">;
  response: Response;
  data: Omit<AddPageHandlerBody, "name">;
  where: Pick<AddPageHandlerBody, "name">;
  next: NextFunction;
};

type UpdatePageHandlerErrorCodes = (
  argument: UpdatePageHandlerErrorCodesArguments,
) => Promise<void>;

const updatePageHandlerErrorCodes: UpdatePageHandlerErrorCodes = async ({
  request: { jsonRedisClient },
  data,
  where,
}: UpdatePageHandlerErrorCodesArguments): Promise<void> => {
  const { name }: UpdatePageHandlerErrorCodesArguments["where"] = where;
  await postgreSQLClient.page.update({
    where,
    data,
  });
  const redisPage: UpdatePageHandlerErrorCodesArguments["data"] =
    await getFromJsonRedisClient<UpdatePageHandlerErrorCodesArguments["data"]>({
      key: `page-${name}`,
      instance: jsonRedisClient,
    });
  if (redisPage) {
    await jsonRedisClient.set(`page-${name}`, data);
  }
};
export default updatePageHandlerErrorCodes;
