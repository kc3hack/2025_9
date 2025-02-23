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
