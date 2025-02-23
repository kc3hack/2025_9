import { createUUID } from "@/helper/uuid";
import prisma from "@/prisma/client";
import type { Story as DBStory } from "@prisma/client";
import type { PrismaClient } from "@prisma/client/extension";

class Service {
	db: PrismaClient;

	constructor(db: PrismaClient) {
		this.db = db;
	}

	async findStories({ offset = 0, limit = 10, ids = [] } = {}) {
		const data: Promise<DBStory[]> = await this.db.story.findMany({
			skip: offset,
			take: limit,
			where: ids.length > 0 ? { id: { in: ids } } : {},
			orderBy: { created_at: "desc" },
		});
		return data;
	}

	async findStoriesWithPager({ page = 1, limit = 10 }) {
		const offset = (page - 1) * limit;
		const data = await this.findStories({ offset, limit });
		const count = await this.db.story.count();
		return { data, count };
	}

	async findStoryByID(id: bigint): Promise<DBStory | null> {
		const data = await this.db.story.findUnique({
			where: {
				id: id,
			},
		});
		if (!data) return null;

		return data;
	}

	async createStory(story: Partial<DBStory>): Promise<DBStory> {
		if (!story.title) throw new Error("Title is required");
		if (!story.content) throw new Error("Content is required");
		if (!story.type) throw new Error("Type is required");
		if (!story.area) throw new Error("Area is required");
		if (story.latitude === undefined) throw new Error("Latitude is required");
		if (story.longitude === undefined) throw new Error("Longitude is required");

		const data = await this.db.story.create({
			data: {
				id: await createUUID(),
				user_account_id: 0n,
				title: story.title,
				content: story.content,
				image_url: story.image_url,
				type: story.type,
				status: story.status,
				difficulty: story.difficulty,
				estimated_time: story.estimated_time,
				area: story.area,
				latitude: story.latitude,
				longitude: story.longitude,
				radius: story.radius,
				pin_class: story.pin_class,
			},
		});
		return data;
	}

	async updateStory(id: bigint, story: Partial<DBStory>): Promise<DBStory> {
		const data = await this.db.story.update({
			where: { id: id },
			data: {
				title: story.title,
				content: story.content,
				image_url: story.image_url,
				type: story.type,
				status: story.status,
				difficulty: story.difficulty,
				estimated_time: story.estimated_time,
				area: story.area,
				latitude: story.latitude,
				longitude: story.longitude,
				radius: story.radius,
				pin_class: story.pin_class,
			},
		});
		return data;
	}
}

export const StoryService = new Service(prisma);
