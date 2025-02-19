import prisma from "../../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  const hint = await prisma.hint.findUnique({
    where: { id: BigInt(slug) },
  });
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
  const hint = await prisma.hint.update({
    where: { id: BigInt(slug) },
    data: {
      title: res.title,
      content: res.content,
      image_url: res.image_url,
    },
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
  const hint = await prisma.hint.delete({
    where: { id: BigInt(slug) },
  });
  // BigIntをStringに変換しないと.jsonでエラーが出る
  return NextResponse.json({
    ...hint,
    id: hint.id.toString(),
  });
}
