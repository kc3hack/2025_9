/**
 * 配列なら最初の要ｓ素、そうでなければ自分自身を返す
 * @param value 配列もしくは単一の値
 * @returns 配列なら最初の要素、そうでなければ自分自身
 */
export const firstOrSelf = <T>(value: T | T[]): T | undefined =>
	Array.isArray(value) ? value[0] : value;
