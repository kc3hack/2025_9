import { NextRequest } from "next/server";
import { HintService } from "@/services/hintService";
import { BadRequestResponse, JSONResponse } from "@/helper/response";

function searchAndParseQueryParam(param: string | null): number | undefined {
  return param ? parseInt(param) : undefined;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = searchAndParseQueryParam(searchParams.get("limit"));
  const offset = searchAndParseQueryParam(searchParams.get("offset"));
  // FIFOの形式でデータは取得される
  // offsetが大きいほど新しいでデータが取得される
  const hints = await HintService.findHints(limit, offset);
  return JSONResponse(hints);
}

export async function POST(request: NextRequest) {
  const { title, content, image_url } = await request.json();
  if (!title || !content) {
    return BadRequestResponse();
  }
  const hint = await HintService.createHint({
    title: title,
    content: content,
    image_url: image_url,
  });
  return JSONResponse(hint);
}
