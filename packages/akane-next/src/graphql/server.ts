import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { readFileSync } from 'fs';
import { NextRequest } from 'next/server';
import { UserResolver } from './handler/user.handler';
import { Resolvers } from '../../apollo/__generated__/server/resolvers-types';


// Schema 定義をファイルから読み取る
const schemaPath = "schema/akane-web-graphql.gql";
const typeDefs = readFileSync(schemaPath, { encoding: "utf-8" });

const server = new ApolloServer<Resolvers>({
  typeDefs,
  // Resolver の定義はここで行い、ハンドラとの関連付けを行う
  resolvers: {
    Query: {
      user: UserResolver,
    }
  } as Resolvers,
});

const GraphAPIServer = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => ({ req, user: {id: 'id-1'} }),
});

export default GraphAPIServer;
