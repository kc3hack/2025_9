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
  try {
    const { title, content, image_url } = await request.json();

    const hint = await createHint({
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
