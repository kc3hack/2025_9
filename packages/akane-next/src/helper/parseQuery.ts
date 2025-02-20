/**
 * 受け取ったクエリパラメータをパースして数値に変換する
 *
 * もしクエリパラメータがnullの場合はundefinedを返す
 *
 * クエリパラメータが数値に変換できない場合にもundefinedを返す
 *
 * @param param パースするクエリパラメータ, string | null
 * @returns パースした数値, number | undefined
 */

export function ParseQueryParam(param: string | null): number | undefined {
  if (param === null) {
    return undefined;
  }
  const num = Number(param);
  if (isNaN(num)) {
    return undefined;
  }
  return num;
}
