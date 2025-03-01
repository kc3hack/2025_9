import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import { Resolvers } from "../../apollo/__generated__/server/resolvers-types";
import { UserResolver } from "./resolver/query/user";
import { typeDefs } from "./typedefs";

const server = new ApolloServer<Resolvers>({
	typeDefs,
	// Resolver の定義はここで行い、ハンドラとの関連付けを行う
	resolvers: {
		Query: {
			user: UserResolver,
		},
	} as Resolvers,
});

const GraphAPIServer = startServerAndCreateNextHandler<NextRequest>(server, {
	context: async (req) => ({ req, user: { id: "id-1" } }),
});

export default GraphAPIServer;
