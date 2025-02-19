import { NextRequest, NextResponse } from "next/server";
import { getHint, updateHint, deleteHint } from "@/services/hintService";
import SafeJSON from "@/helper/json";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const hint = await getHint(BigInt(id));
  if (!hint) {
    return NextResponse.json({ error: "Hint not found" }, { status: 404 });
  }
  return new Response(SafeJSON.stringify(hint), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const res = await request.json();
  const hint = await updateHint({
    id: BigInt(id),
    title: res.title,
    content: res.content,
    image_url: res.image_url,
  });
  // BigIntをStringに変換しないと.jsonでエラーが出る
  return new Response(SafeJSON.stringify(hint), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const slug = (await params).id;
  const hint = await deleteHint(BigInt(slug));
  // BigIntをStringに変換しないと.jsonでエラーが出る
  return new Response(SafeJSON.stringify(hint), {
    headers: {
      "content-type": "application/json",
    },
  });
}
