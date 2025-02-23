import { createRandomAlphaNumeric, createRandomIntegerInRange } from "./random";

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

describe("createRandomIntegerInRange", () => {
	it("ランダムに整数を生成できる", () => {
		const tests = Array.from({ length: 10 });
		const results = tests.map(() =>
			createRandomIntegerInRange({ min: 0, max: 100 }),
		);
		expect(results.every((result) => Number.isInteger(result))).toBe(true);
		expect(results.every((result) => result >= 0)).toBe(true);
		expect(results.every((result) => result <= Number.MAX_SAFE_INTEGER)).toBe(
			true,
		);
	});

	it("範囲を指定してランダムに整数を生成できる", () => {
		const tests = Array.from({ length: 10 });
		const results = tests.map(() =>
			createRandomIntegerInRange({ min: 100, max: 200 }),
		);
		expect(results.every((result) => Number.isInteger(result))).toBe(true);
		expect(results.every((result) => result >= 100)).toBe(true);
		expect(results.every((result) => result <= 200)).toBe(true);
	});
});

describe("createRandomFloatInRange", () => {
	it("ランダムに小数を生成できる", () => {
		const tests = Array.from({ length: 10 });
		const results = tests.map(() =>
			createRandomIntegerInRange({ min: 0, max: 100 }),
		);
		expect(results.every((result) => typeof result === "number")).toBe(true);
		expect(results.every((result) => result >= 0)).toBe(true);
		expect(results.every((result) => result <= 100)).toBe(true);
	});
});
