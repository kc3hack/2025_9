import { QueryUserArgs, User } from "../../../apollo/__generated__/server/resolvers-types";

export const UserResolver = (_: any, args: QueryUserArgs): User => {
  return { id: `id-${args.id}`, name: 'test' };
};

