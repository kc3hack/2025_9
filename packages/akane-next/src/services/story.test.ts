import { resetDatabase } from "@/helper/test/database";
import { createStory } from "@/helper/test/story";
import { StoryService } from "./story";

beforeEach(async () => {
	await resetDatabase();
});

describe("findStories", async () => {
	it("複数のストーリーを取得できる", async () => {
		const story1 = await createStory();
		const story2 = await createStory();

		const stories = await StoryService.findStories({
			offset: 0,
			limit: 10,
		});
		expect(stories).toEqual([story2, story1]);
	});
});

describe("findStoriesWithPager", async () => {
	it("ページネーションして返すことができる", async () => {
		const story1 = await createStory();
		const story2 = await createStory();
		const story3 = await createStory();
		const story4 = await createStory();

		const stories1 = await StoryService.findStoriesWithPager({
			page: 1,
			limit: 2,
		});
		expect(stories1.data).toEqual([story4, story3]);

		const stories2 = await StoryService.findStoriesWithPager({
			page: 2,
			limit: 2,
		});
		expect(stories2.data).toEqual([story2, story1]);
	});
});

describe("findStoryByID", async () => {
	it("IDからStoryを取得できる", async () => {
		const story = await createStory();
		const foundStory = await StoryService.findStoryByID(story.id);
		expect(foundStory).toEqual(story);
	});
});

describe("createStory", async () => {
	it("正しく作成できる", async () => {
		const story = await StoryService.createStory({
			title: "title",
			content: "content",
			type: "long",
			area: "area",
			latitude: 0,
			longitude: 0,
		});

		expect(story.title).toEqual("title");
		expect(story.content).toEqual("content");
		expect(story.type).toEqual("long");
		expect(story.area).toEqual("area");
		expect(story.latitude).toEqual(0);
		expect(story.longitude).toEqual(0);
	});

	describe("updateStory", async () => {
		it("正しく更新できる", async () => {
			const story = await createStory();
			const updatedStory = await StoryService.updateStory(story.id, {
				title: "updated title",
				content: "updated content",
				type: "short",
				area: "updated area",
				latitude: 1,
				longitude: 1,
			});

			expect(updatedStory.title).toEqual("updated title");
			expect(updatedStory.content).toEqual("updated content");
			expect(updatedStory.type).toEqual("short");
			expect(updatedStory.area).toEqual("updated area");
			expect(updatedStory.latitude).toEqual(1);
			expect(updatedStory.longitude).toEqual(1);
		});
	});
});

describe("findStoriesByLocation", async () => {
	const kyoto = {
		latitude: 34.98586624318786,
		longitude: 135.7584609696994,
	};

	it("座標近くのストーリーを取得できる", async () => {
		// 座標に近いStory
		const story1 = await createStory({
			latitude: kyoto.latitude + 0.01,
			longitude: kyoto.longitude - 0.01,
		});
		// 座標から少し離れたStory
		const story2 = await createStory({
			latitude: kyoto.latitude - 0.02,
			longitude: kyoto.longitude - 0.02,
		});
		// 座標から遠いStory（取得されない）
		const story3 = await createStory({
			latitude: kyoto.latitude + 0.9,
			longitude: kyoto.longitude + 0.9,
		});

		const stories = await StoryService.findStoriesByLocation({
			latitude: kyoto.latitude,
			longitude: kyoto.longitude,
			range: 0.05,
		});
		expect(stories).toEqual([story1, story2]);
		expect(stories).not.toContain(story3);
	});
});

describe("searchStories", async () => {
	const kyoto = {
		latitude: 34.98586624318786,
		longitude: 135.7584609696994,
	};

	it("タイトルで検索ができる", async () => {
		const story1 = await createStory({
			title: "テストテスト検索テストテスト",
		});
		const story2 = await createStory({
			title: "テストテスト",
		});
		const result = await StoryService.searchStories("検索");
		expect(result).toEqual([story1]);
		expect(result).not.toContain(story2);
	});

	it("内容で検索できる", async () => {
		const story1 = await createStory({
			content: "テストテスト検索テストテスト",
		});
		const story2 = await createStory({
			content: "テストテスト",
		});
		const result = await StoryService.searchStories("", "検索");
		expect(result).toEqual([story1]);
		expect(result).not.toContain(story2);
	});

	it("場所で検索ができる", async () => {
		// 座標に近いStory
		const story1 = await createStory({
			latitude: kyoto.latitude + 0.01,
			longitude: kyoto.longitude - 0.01,
		});
		// 座標から少し離れたStory
		const story2 = await createStory({
			latitude: kyoto.latitude - 0.02,
			longitude: kyoto.longitude - 0.02,
		});
		// 座標から遠いStory（取得されない）
		const story3 = await createStory({
			latitude: kyoto.latitude + 0.9,
			longitude: kyoto.longitude + 0.9,
		});

		const result = await StoryService.searchStories("", "", {
			latitude: kyoto.latitude,
			longitude: kyoto.longitude,
			range: 0.05,
		});
		expect(result).toEqual([story1, story2]);
		expect(result).not.toContain(story3);
	});

	it("組み合わせて検索ができる", async () => {
		// 座標に近いStory
		const story1 = await createStory({
			title: "テスト検索テスト",
			latitude: kyoto.latitude + 0.01,
			longitude: kyoto.longitude - 0.01,
		});
		// 座標から少し離れたStory
		const story2 = await createStory({
			title: "テストテスト",
			content: "検索",
			latitude: kyoto.latitude - 0.02,
			longitude: kyoto.longitude - 0.02,
		});
		// コンテンツを含むが、座標から遠いStory（取得されない）
		const story3 = await createStory({
			content: "検索",
			latitude: kyoto.latitude + 0.9,
			longitude: kyoto.longitude + 0.9,
		});

		const result = await StoryService.searchStories("検索", "検索", {
			latitude: kyoto.latitude,
			longitude: kyoto.longitude,
			range: 0.05,
		});
		expect(result).toEqual([story1, story2]);
		expect(result).not.toContain(story3);
	});
});
