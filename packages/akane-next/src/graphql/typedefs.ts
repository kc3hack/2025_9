// このファイルは ./scripts/copy-gql-schema.sh で生成しています。直接編集しないでください。
export const typeDefs = "schema { query: Query } type Query { user(id: ID!): User greet(name: String!): Greet } type Greet { text: String! name: String! } type User { id: ID! name: String! }";
