import { ParseQueryParam } from "@/helper/parseQuery";
import {
	BadRequestResponse,
	JSONResponse,
	NotFoundResponse,
} from "@/helper/response";
import { HintService } from "@/services/hintService";
import { NextRequest } from "next/server";

/**
 * (一応)requestの送り方：
 * "domain/api/hints/?offset=5&limit=30"
 *
 * @param request
 * @returns
 */
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const limit = ParseQueryParam(searchParams.get("limit"));
	const offset = ParseQueryParam(searchParams.get("offset"));
	// FIFOの形式でデータは取得される
	// offsetが大きいほど新しいでデータが取得される
	// limitとoffsetがundefinedの場合はデフォルト値のlimit:10とoffset:0が適用される
	const hints = await HintService.findHints(limit, offset);
	if (!hints) {
		return NotFoundResponse("Hints");
	}
	return JSONResponse(hints);
}

export async function POST(request: NextRequest) {
	const {
		title,
		content,
		image_url,
	}: { title: string; content: string; image_url: string | null } =
		await request.json();
	if (!title || !content) {
		return BadRequestResponse("Title and Content are required");
	}
	const hint = await HintService.createHint({
		title: title,
		content: content,
		image_url: image_url,
	});
	return JSONResponse(hint);
}
