import prisma from "@/prisma/client";
import type { Story } from "@prisma/client";
import { createUUID } from "../uuid";
import {
	createRandomAlphaNumeric,
	createRandomFloatInRange,
	createRandomIntegerInRange,
} from "./random";

export async function createStory(story: Partial<Story> = {}) {
	return await prisma.story.create({
		data: {
			id: story.id ?? (await createUUID()),
			user_account_id: story.user_account_id ?? 0n,
			title: story.title ?? createRandomAlphaNumeric(),
			content: story.content ?? createRandomAlphaNumeric(),
			image_url: story.image_url ?? "https://example.com/image.jpg",
			type: story.type ?? "long",
			status: story.status ?? "published",
			difficulty:
				story.difficulty ?? createRandomIntegerInRange({ min: 1, max: 5 }),
			estimated_time: story.estimated_time,
			area: story.area ?? createRandomAlphaNumeric(),
			latitude:
				story.latitude ?? createRandomFloatInRange({ min: -90, max: 90 }),
			longitude:
				story.longitude ?? createRandomFloatInRange({ min: -180, max: 180 }),
			radius: story.radius ?? 0,
			pin_class: story.pin_class ?? createRandomAlphaNumeric(),
		},
	});
}
