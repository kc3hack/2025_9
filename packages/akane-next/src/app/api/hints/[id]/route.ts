import { JSONResponse, NotFoundResponse } from "@/helper/response";
import { HintService } from "@/services/hintService";
import { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const id = (await params).id;
	const hint = await HintService.findHint(BigInt(id));
	if (!hint) {
		return NotFoundResponse("Hint");
	}
	return JSONResponse(hint);
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const id = (await params).id;
	const {
		title,
		content,
		image_url,
	}: { title: string; content: string; image_url: string | null } =
		await request.json();
	// PATCHとしても使えるように、titleやcontentがない場合でも更新できるようにしている
	// フィールドがない場合にはそのフィールドはundefinedとなり、更新されない
	// また、updateHint側で空文字列を取り除くので、空文字列だけが渡された場合更新されない
	const hint = await HintService.updateHint({
		id: BigInt(id),
		title: title,
		content: content,
		image_url: image_url,
	});
	return JSONResponse(hint);
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const id = (await params).id;
	const hint = await HintService.deleteHint(BigInt(id));
	return JSONResponse(hint);
}
