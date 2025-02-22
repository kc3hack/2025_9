import prisma from "@/prisma/client";
import { createUUID } from "../uuid";
import { resetDatabase } from "./database";

beforeEach(async () => {
	await resetDatabase();
});

test("test_db の場合はデータを削除する", async () => {
	await prisma.hint.create({
		data: {
			id: await createUUID(),
			title: "title",
			content: "content",
		},
	});
	const before = await prisma.hint.findMany();
	expect(before).toHaveLength(1);

	await resetDatabase();

	const after = await prisma.hint.findMany();
	expect(after).toHaveLength(0);
});
