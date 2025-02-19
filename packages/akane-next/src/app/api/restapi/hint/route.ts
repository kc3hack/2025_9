import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET() {
  const hints = await prisma.hint.findMany();
  // BigIntをStringに変換しないと.jsonでエラーが出る
  return NextResponse.json(
    hints.map((hint) => ({
      ...hint,
      id: hint.id.toString(),
    }))
  );
}

export async function POST(request: NextRequest) {
  const res = await request.json();

  const [{ id }] = await prisma.$queryRaw<
    Array<{ id: bigint }>
  >`SELECT UUID_SHORT() as id`;
  const hint = await prisma.hint.create({
    data: {
      id: id,
      title: res.title,
      content: res.content,
      image_url: res.image_url,
    },
  });
  // BigIntをStringに変換しないと.jsonでエラーが出る
  return NextResponse.json({
    ...hint,
    id: id.toString(),
  });
}
