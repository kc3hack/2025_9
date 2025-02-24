import prisma from "../prisma/client";

/**
 * この関数はMySQLのUUID_SHORT()を使って、bigint型のUUIDを生成します。
 *
 * @returns bigint *
 */
export const createUUID = async (): Promise<bigint> => {
	const [{ id }] = await prisma.$queryRaw<
		Array<{ id: bigint }>
	>`SELECT UUID_SHORT() as id`;
	return id;
};
