import page from "../page/page";
import post from "../post/post";

const mainSchemaConnector = `#graphql
  schema {
    query: Query
  }
  type Query {
    pages(ids: [Int]): [Page]
    posts(ids: [Int]): [Post]
  }
  ${post}
  ${page}
`;

export default mainSchemaConnector;
