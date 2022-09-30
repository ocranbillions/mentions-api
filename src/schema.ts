import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type LinkObject {
    url: String!
    title: String!
  }
  type Response {
    mentions: [String]
    emoticons: [String]
    links: [LinkObject]
  }
  type RootQuery {
    records(message: String!): Response!
  }
  schema {
    query: RootQuery
  }
`);

export default schema;