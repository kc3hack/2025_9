import prisma from "@/prisma/client";

export async function resetDatabase() {
	// 現在のデータベース名を取得
	const [{ dbName }] = await prisma.$queryRaw<Array<{ dbName: string }>>`
    SELECT DATABASE() as dbName;
  `;

	// 本番環境で誤って実行しないようにチェック
	if (dbName !== "akane_test") {
		console.warn(
			`resetDatabase() skipped: Current DB is '${dbName}', not 'akane_test'`,
		);
		return;
	}

	// akane_test の場合のみ実行
	const tables = await prisma.$queryRaw<Array<{ TABLE_NAME: string }>>`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = DATABASE();
  `;

	const names = tables
		.filter(
			({ TABLE_NAME }) => TABLE_NAME && TABLE_NAME !== "_prisma_migrations",
		)
		.map(({ TABLE_NAME }) => TABLE_NAME);

	for (const name of names) {
		await prisma.$executeRawUnsafe(`TRUNCATE ${name}`);
	}
}
