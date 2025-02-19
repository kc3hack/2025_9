import { NextRequest, NextResponse } from "next/server";
import { getHint, updateHint, deleteHint } from "@/services/hintService";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  const hint = await getHint(BigInt(slug));
  // BigIntをStringに変換しないと.jsonでエラーが出る
  return NextResponse.json({
    ...hint,
    id: hint?.id.toString(),
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  const res = await request.json();
  const hint = await updateHint({
    id: BigInt(slug),
    title: res.title,
    content: res.content,
    image_url: res.image_url,
  });
  // BigIntをStringに変換しないと.jsonでエラーが出る
  return NextResponse.json({
    ...hint,
    id: hint.id.toString(),
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  const hint = await deleteHint(BigInt(slug));
  // BigIntをStringに変換しないと.jsonでエラーが出る
  return NextResponse.json({
    ...hint,
    id: hint.id.toString(),
  });
}
