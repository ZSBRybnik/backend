import { stringify } from "@iarna/toml";
import { encode } from "@msgpack/msgpack";
import { Type } from "avsc";
import { serialize } from "bson";
import { Response } from "express";
import { dumpText } from "ion-js";
import { dump } from "js-yaml";
import { stringify as json5Stringify } from "json5";
import { toPairs } from "lodash";
import { compress } from "snappy";
import { stringify as superjsonStringify } from "superjson";
import xml, { XmlObject } from "xml";
import contentTypes, {
  ContentTypeKeys,
} from "~backend/source/server/rest/constants/contentTypes/contentTypes";

export type SendWithValidFormatArguments<T extends object> = {
  data: T;
  contentType: string;
  response: Response;
};

type FormatToTransformMapperArguments<T extends object> = {
  data: T;
};

type FormatToTransformMapper = {
  [key in ContentTypeKeys]: <T extends object>(
    argument: FormatToTransformMapperArguments<T>,
  ) => Promise<unknown> | unknown;
};

const yamlAndYmlFormat = <T extends object>({
  data,
}: FormatToTransformMapperArguments<T>): unknown => {
  return dump(data);
};

const formatToTransformMapper: FormatToTransformMapper = {
  xml: <T extends object>({
    data,
  }: FormatToTransformMapperArguments<T>): unknown => {
    return xml({
      root: toPairs(data).map(([key, value]: [string, unknown]): XmlObject => {
        return { [key]: value } as XmlObject;
      }),
    });
  },
  yaml: yamlAndYmlFormat,
  yml: yamlAndYmlFormat,
  toml: <T extends object>({
    data,
  }: FormatToTransformMapperArguments<T>): unknown => {
    return stringify(data);
  },
  json5: <T extends object>({
    data,
  }: FormatToTransformMapperArguments<T>): unknown => {
    return json5Stringify(data);
  },
  bson: <T extends object>({
    data,
  }: FormatToTransformMapperArguments<T>): unknown => {
    return serialize(data);
  },
  msgpack: <T extends object>({
    data,
  }: FormatToTransformMapperArguments<T>): unknown => {
    return encode(data);
  },
  avro: <T extends object>({
    data,
  }: FormatToTransformMapperArguments<T>): unknown => {
    return Type.forValue(data).toBuffer(data);
  },
  snappy: async <T extends object>({
    data,
  }: FormatToTransformMapperArguments<T>): Promise<unknown> => {
    return await compress(JSON.stringify(data));
  },
  ion: <T extends object>({
    data,
  }: FormatToTransformMapperArguments<T>): unknown => {
    return dumpText(data);
  },
  superjson: <T extends object>({
    data,
  }: FormatToTransformMapperArguments<T>): unknown => {
    return superjsonStringify(data);
  },
};

const sendWithValidFormat = async <T extends object>({
  data,
  contentType,
  response,
}: SendWithValidFormatArguments<T>): Promise<void> => {
  const contentFormat: ContentTypeKeys = contentType.split(
    "/",
  )[1] as ContentTypeKeys;
  if (contentTypes[contentFormat]) {
    response.header("Content-Type", contentType);
    response.send(await formatToTransformMapper[contentFormat]({ data }));
  } else {
    response.json(data);
  }
};

export default sendWithValidFormat;
