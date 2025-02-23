import { describe, expect, it } from "vitest";
import { firstOrSelf } from "./array";

describe("firstOrSelf", () => {
  it("配列が渡された場合、最初の要素を返す", () => {
    const result = firstOrSelf([1, 2, 3]);
    expect(result).toBe(1);
  });

  it("配列でない場合、渡された値自体を返す", () => {
    const result = firstOrSelf(42);
    expect(result).toBe(42);
  });

  it("空の配列の場合は、undefinedを返す", () => {
    const result = firstOrSelf([]);
    expect(result).toBeUndefined();
  });
});
