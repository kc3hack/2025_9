import { describe, it, expect } from 'vitest'
import { AsBigInt } from './bigint'

describe('AsBigIntのテスト', () => {
  it("数字の文字列をBigIntにできる", () => {
    expect(AsBigInt("9007199254740991")).toEqual(9007199254740991n)
  })

  it("負数でも変換できる", () => {
    expect(AsBigInt("-42")).toEqual(-42n)
  })

  it("16進数でも変換できるようにする", () => {
    expect(AsBigInt("0x2a")).toEqual(42n)
  })

  it("変換できない時は undefined を返す", () => {
    expect(AsBigInt("abc")).toBeUndefined()
    expect(AsBigInt("")).toBeUndefined()
    expect(AsBigInt("123abc456")).toBeUndefined()
  })
})
