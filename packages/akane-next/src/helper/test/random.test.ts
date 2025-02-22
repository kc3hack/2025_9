import { createRandomAlphaNumeric } from "./random";

describe("createRandomAlphaNumeric", () => {
	it("ランダムに20文字の長さの文字列を生成できる", async () => {
		const result = createRandomAlphaNumeric();
		expect(result.length).toBe(20);
		expect(typeof result).toBe("string");
	});

	it("指定した長さの文字列を生成できる", async () => {
		const result = createRandomAlphaNumeric(10);
		expect(result.length).toBe(10);
		expect(typeof result).toBe("string");
	});

	it("10回連続しても同じ文字列が生成されることはないだろう", async () => {
		const results = Array.from({ length: 10 }, () =>
			createRandomAlphaNumeric(),
		);
		expect(new Set(results).size).toBe(10);
	});
});
