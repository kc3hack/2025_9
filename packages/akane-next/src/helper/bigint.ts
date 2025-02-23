/**
 * 引数に与えられた文字列を BigInt に変換する。
 * 変換できなかった場合は undefined を返す。
 * @param value 変換したい文字列
 * @returns BigInt に変換した値、変換できなかった場合は undefined
 */
export const AsBigInt = (value?: string): bigint | undefined => {
	if (!value || value === "") {
		return undefined;
	}
	try {
		return BigInt(value);
	} catch {
		return undefined;
	}
};
