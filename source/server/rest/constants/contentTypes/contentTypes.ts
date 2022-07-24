export type ContentTypeKeys =
  | "xml"
  | "yaml"
  | "yml"
  | "toml"
  | "json5"
  | "bson"
  | "msgpack"
  | "avro"
  | "snappy"
  | "ion";

export type ContentTypes = {
  [key in ContentTypeKeys]: string[];
};

const contentTypes: ContentTypes = {
  xml: ["application/xml", "text/xml"],
  yaml: ["application/yaml", "text/yaml"],
  yml: ["application/yml", "text/yml"],
  toml: ["application/toml", "text/toml"],
  json5: ["application/json5", "text/json5"],
  bson: ["application/bson", "text/bson"],
  msgpack: ["application/msgpack", "text/msgpack"],
  avro: ["application/avro", "text/avro"],
  snappy: ["application/snappy", "text/snappy"],
  ion: ["application/ion", "text/ion"],
};

export default contentTypes;
