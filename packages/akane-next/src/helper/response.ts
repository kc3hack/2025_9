import { NextResponse } from "next/server";
import SafeJSON from "./json";

/**
 * objectをapplication/json形式に変換してResponseを返す
 *
 * SafeJSON.stringifyを使っており、BigIntを文字列に変換している
 *
 * @param {object} data 変換するデータ
 * @returns {Response} application/json形式のResponse
 */
export function JSONResponse(data: object): Response {
  return new Response(SafeJSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}

/**
 * 404 Not FoundのResponseを返す
 * lackingItemが何かを指定することで、どのリソースが見つからなかったのかを明示できる
 *
 * @param {string} lackingItem 見つからなかったリソース名
 * @returns {Response} 404 Not FoundのResponse
 */
export function NotFoundResponse(lackingItem: string): Response {
  return NextResponse.json(
    { error: `${lackingItem} not found` },
    { status: 404 }
  );
}

/**
 * 400 Bad RequestのResponseを返す
 *
 * @param message - Bad Requestの理由 (空の場合:"Invalid request")
 * @returns {Response} 400 Bad RequestのResponse
 */
export function BadRequestResponse(
  message: string = "Invalid request"
): Response {
  return new Response(message, {
    status: 400,
  });
}
