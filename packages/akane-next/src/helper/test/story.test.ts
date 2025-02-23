import { createStory } from "./story";

describe("createStory", () => {
	it("ランダムな内容で作成してくれる", async () => {
		const story = await createStory();
		expect(story.title).not.toBeUndefined();
		expect(story.content).not.toBeUndefined();
		expect(story.image_url).not.toBeUndefined();
		expect(story.type).not.toBeUndefined();
		expect(story.status).not.toBeUndefined();
		expect(story.difficulty).not.toBeUndefined();
		expect(story.estimated_time).not.toBeUndefined();
		expect(story.area).not.toBeUndefined();
		expect(story.latitude).not.toBeUndefined();
		expect(story.longitude).not.toBeUndefined();
		expect(story.radius).not.toBeUndefined();
		expect(story.pin_class).not.toBeUndefined();
		expect(story.updated_at).not.toBeUndefined();
		expect(story.created_at).not.toBeUndefined();
	});
});
