/**
 * 渡されたオブジェクトの各要素に対して、空文字列を取り除き、文字列の先頭と末尾の空白も削除します。
 * 空でなくなった要素だけを含むオブジェクトを返します。
 *
 * @param object - 空文字列や空白の削除を行うオブジェクト
 * @returns 空でない要素だけを含む新しいオブジェクト
 */
export function FilterAndTrimEmptyStrings<T extends object>(
  data: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(data)
      .map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ])
      .filter(([, value]) => value !== "")
  ) as Partial<T>;
}
