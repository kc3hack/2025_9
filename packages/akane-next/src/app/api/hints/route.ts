import { NextRequest } from "next/server";
import { HintService } from "@/services/hintService";
import { BadRequestResponse, JSONResponse } from "@/helper/response";

export async function GET() {
  const hints = await HintService.findHints();
  return JSONResponse(hints);
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, image_url } = await request.json();

    const hint = await HintService.createHint({
      title: title,
      content: content,
      image_url: image_url,
    });
    return JSONResponse(hint);
  } catch {
    return BadRequestResponse();
  }
}
