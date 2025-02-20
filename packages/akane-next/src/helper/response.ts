import SafeJSON from "./json";

export function JSONResponse(data: object): Response {
  return new Response(SafeJSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export function BadRequestResponse(): Response {
  return new Response("Bad Request", {
    status: 400,
  });
}
