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

	/**
	 * 座標近くのストーリーを取得します。
	 * 緯度経度それぞれ ±range の範囲内にあるものを対象とします。
	 *
	 * @param param0 緯度経度と範囲
	 * @returns {Promise<DBStory[]>} ストーリーのリスト
	 */
	async findStoriesByLocation({
		latitude,
		longitude,
		range = 0.01,
	}: {
		latitude: number;
		longitude: number;
		range: number;
	}): Promise<DBStory[]> {
		const data: DBStory[] = await this.db.story.findMany({
			where: {
				latitude: {
					gte: latitude - range,
					lte: latitude + range,
				},
				longitude: {
					gte: longitude - range,
					lte: longitude + range,
				},
			},
		});

		// 座標に近い順に並び替え
		data.sort((a, b) => {
			const aDistance =
				Math.abs(a.latitude - latitude) + Math.abs(a.longitude - longitude);
			const bDistance =
				Math.abs(b.latitude - latitude) + Math.abs(b.longitude - longitude);
			return aDistance - bDistance;
		});

		return data;
	}

	/**
	 * ストーリーをさまざまな要素で検索する関数。
	 * タイトルと内容の検索は OR として扱い、位置検索は AND で行われます。
	 * 例)
	 * 		StoryService.searchStories("A", "B", { 位置情報条件 })
	 * 上のような関数呼び出しは以下のように解釈します。
	 *
	 * タイトルにAが含まれているもの、もしくは、内容にBが含まれているもの
	 *  かつ
	 * 位置情報条件に一致するもの
	 *
	 * @param title タイトルで検索するワード
	 * @param content コンテンツで検索するワード
	 * @param location 緯度経度と範囲
	 * @returns {Promise<DBStory[]>} ストーリーのリスト
	 */
	async searchStories(
		title?: string,
		content?: string,
		location?: { latitude: number; longitude: number; range: number },
	) {
		const stories: DBStory[] = await this.db.story.findMany({
			where: {
				OR: [
					{
						OR: [
							{
								title: {
									// 空文字検索回避
									contains: title ? title : undefined,
								},
							},
							{
								content: {
									// 空文字検索回避
									contains: content ? content : undefined,
								},
							},
						],
						latitude: location
							? {
									gte: location.latitude - location.range,
									lte: location.latitude + location.range,
								}
							: {},
						longitude: location
							? {
									gte: location.longitude - location.range,
									lte: location.longitude + location.range,
								}
							: {},
					},
				],
			},
		});

		// 座標に近い順に並び替え
		if (location) {
			stories.sort((a, b) => {
				const aDistance =
					Math.abs(a.latitude - location.latitude) +
					Math.abs(a.longitude - location.longitude);
				const bDistance =
					Math.abs(b.latitude - location.latitude) +
					Math.abs(b.longitude - location.longitude);
				return aDistance - bDistance;
			});
		}

		return stories;
	}
}

export const StoryService = new Service(prisma);
