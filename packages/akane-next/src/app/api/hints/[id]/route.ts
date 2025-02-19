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
  try {
    const { title, content, image_url } = await request.json();
    const hint = await updateHint({
      id: BigInt(id),
      title: title,
      content: content,
      image_url: image_url,
    });
    return new Response(SafeJSON.stringify(hint), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch {
    return new Response("Bad Request", {
      status: 400,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const slug = (await params).id;
  const hint = await deleteHint(BigInt(slug));
  return new Response(SafeJSON.stringify(hint), {
    headers: {
      "content-type": "application/json",
    },
  });
}
