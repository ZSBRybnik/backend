import page from "../page/page";
import post from "../post/post";

const mainSchemaConnector = `#graphql
  schema {
    query: Query
    mutation: Mutation
  }
  type Query {
    pages(ids: [Int]): [Page]
    posts(ids: [Int]): [Post]
  }
  type Mutation {
    updatePage(id: Int!, name: String, title: String, content: String): Page
    addPage( name: String, title: String, content: String): Page
    deletePage(id: Int!): Page
    addPost(author: String, title: String, content: String, brief: String): Post
    deletePost(id: Int!): Post
    updatePost(id: Int!, author: String, title: String, content: String, brief: String): Post
  }
  ${post}
  ${page}

`;

export default mainSchemaConnector;
