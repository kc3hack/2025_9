import prisma from "@/prisma/client";
import { QueryUserArgs, User } from "../../../../apollo/__generated__/server/resolvers-types";
import { GraphQLError } from "graphql";

export const UserResolver = async (_: any, args: QueryUserArgs) => {
  const user = await prisma.userAccount.findUnique({
    where: {
      id: BigInt(args.id)
    }
  });
  if (!user) {
    throw new GraphQLError('ユーザーが見つかりませんでした', {
      extensions: {
        code: 'USER_NOT_FOUND'
      }
    });
  }

  return { id: user.id.toString(), name: user.name  } as User;
};


