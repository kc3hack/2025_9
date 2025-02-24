export type Question = {
	id: bigint;
	storyID: bigint;

	title: string;
	content: string;

	imageURL?: string;

	answer: string;

	priority: number;
};
