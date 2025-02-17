/**
 * オブジェクトを JSON 文字列に変換する
 * DBでBigIntを使っているため、BigIntを文字列に変換し損ねるとエラーが発生するので
 * いい感じのラッパーを用意しておく
 *
 * @param param JSON にしたいオブジェクト
 * @returns JSON 文字列
 */
export const json = (param: object): string => {
  return JSON.stringify(
    param,
    (_, value) => (typeof value === "bigint" ? value.toString() : value)
  );
};


// 名前が思いつかなかったので、とりあえず SafeJSON としておく
const SafeJSON = {
  ...JSON,
  stringify: json,
}

export default SafeJSON;
