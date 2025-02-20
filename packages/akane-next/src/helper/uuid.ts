import prisma from "../prisma/client";

export const createUUID = async () => {
  const [{ id }] = await prisma.$queryRaw<
    Array<{ id: bigint }>
  >`SELECT UUID_SHORT() as id`;
  return id;
};
