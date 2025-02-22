import { createUUID } from "./uuid";

describe("createUUID", () => {
	it("正しくクエリができる", async () => {
		const uuid = await createUUID();
		expect(typeof uuid).toBe("bigint");
	});
});
