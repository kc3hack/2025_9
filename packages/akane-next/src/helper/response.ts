import { NextResponse } from "next/server";
import SafeJSON from "./json";

export function JSONResponse(data: object): Response {
  return new Response(SafeJSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export function ErrorResponse(lackingItem: string): Response {
  return NextResponse.json(
    { error: `${lackingItem} not found` },
    { status: 404 }
  );
}

export function BadRequestResponse(): Response {
  return new Response("Bad Request", {
    status: 400,
  });
}
