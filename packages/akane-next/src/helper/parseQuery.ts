/**
 * 受け取ったクエリパラメータをパースして数値に変換する
 *
 * もしクエリパラメータがnullの場合はundefinedを返す
 *
 * もしクエリパラメータが数値に変換できない場合にもundefinedを返す
 *
 * @param param
 * @returns
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
