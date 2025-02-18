import { QueryGreetArgs } from "../../../../apollo/__generated__/server/resolvers-types";

export const GreetResolver = async (_: any, args: QueryGreetArgs) => {
  return { text: `Hello ${args.name}`, name: args.name };
};
