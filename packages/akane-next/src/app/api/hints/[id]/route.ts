import { NextRequest } from "next/server";
import { HintService } from "@/services/hintService";
import {
  BadRequestResponse,
  ErrorResponse,
  JSONResponse,
} from "@/helper/response";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const hint = await HintService.findHint(BigInt(id));
  if (!hint) {
    return ErrorResponse("Hint");
  }
  return JSONResponse(hint);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const { title, content, image_url } = await request.json();
  if (!title || !content) {
    return BadRequestResponse();
  }
  const hint = await HintService.updateHint({
    id: BigInt(id),
    title: title,
    content: content,
    image_url: image_url,
  });
  return JSONResponse(hint);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const hint = await HintService.deleteHint(BigInt(id));
  return JSONResponse(hint);
}
