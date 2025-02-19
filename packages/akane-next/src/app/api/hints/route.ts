import { NextRequest } from "next/server";
import { getHints, createHint } from "@/services/hintService";
import SafeJSON from "@/helper/json";

export async function GET() {
  const hints = await getHints();
  return new Response(SafeJSON.stringify(hints), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function POST(request: NextRequest) {
  const res = await request.json();

  const hint = await createHint({
    title: res.title,
    content: res.content,
    image_url: res.image_url,
  });

  // hintsのidがBigIntなので、Stringに変換して返さないとエラーになる
  return new Response(SafeJSON.stringify(hint), {
    headers: {
      "content-type": "application/json",
    },
  });
}
