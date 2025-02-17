import prisma from "@/prisma/client";
import { QueryUserArgs, User } from "../../../../apollo/__generated__/server/resolvers-types";

export const UserResolver = async (_: any, args: QueryUserArgs) => {

  const all = await prisma.userAccount.findMany();
  console.log(all);
  const user = await prisma.userAccount.findUnique({
    where: {
      id: BigInt(args.id)
    }
  });
  if (!user) {
    throw new Error('User not found');
  }

  return { id: `${user?.id}`, name: user?.name as string } as User;
};


