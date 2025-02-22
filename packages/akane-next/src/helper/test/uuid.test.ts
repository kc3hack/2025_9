import { ShortUUID } from "./uuid";

describe("UUIDShort", () => {
	it("BigIntで0より大きな値を出してくれる", () => {
		const uuid = ShortUUID.next();
		expect(typeof uuid).toBe("bigint");
		expect(uuid).toBeGreaterThan(0n);
	});

	it("前回生成した値より大きな値が生成される", () => {
		const uuid1 = ShortUUID.next();
		const uuid2 = ShortUUID.next();
		expect(uuid2).toBeGreaterThan(uuid1);
	});

	it("連続して1000回生成しても重複しない", () => {
		const uuids = new Set();
		for (let i = 0; i < 1000; i++) {
			uuids.add(ShortUUID.next());
		}
		expect(uuids.size).toBe(1000);
	});
});
