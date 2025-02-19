import { NextRequest, NextResponse } from "next/server";
import { getHints, createHint } from "@/services/hintService";
import { Hint } from "@/services/hintService";

export async function GET() {
  const hints = await getHints();

  // hintsのidがBigIntなので、Stringに変換して返さないとエラーになる
  return NextResponse.json(
    hints.map((hint: Hint) => ({
      ...hint,
      id: hint.id.toString(),
    }))
  );
}

export async function POST(request: NextRequest) {
  const res = await request.json();

  const hint = await createHint({
    title: res.title,
    content: res.content,
    image_url: res.image_url,
  });

  // hintsのidがBigIntなので、Stringに変換して返さないとエラーになる
  return NextResponse.json({
    ...hint,
    id: hint.id.toString(),
  });
}
