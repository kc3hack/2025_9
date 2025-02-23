import type { Question } from "@prisma/client";

const questions: Question[] = [
	{
		id: 101255557008064512n,
		story_id: 16285261379101901648n,
		title: "4号館から出た後に見える最も大きなものは何か",
		content: "色々なものが見えるよね。",
		image_url: "",
		answer: "建物",
		priority: 1,
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		id: 101255557008064513n,
		story_id: 16285261379101901648n,
		title: "会場にいる動物は何？",
		content: "実はKRPは動物園だった",
		image_url: "",
		answer: "猫",
		priority: 2,
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		id: 101255557008064514n,
		story_id: 16285261379101901648n,
		title: "KRP地下には森と海と何がある？",
		content: "KRPはこの世界の始まりの大地とも言われている",
		image_url: "",
		answer: "空",
		priority: 3,
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		id: 101255557008064515n,
		story_id: 16285261379101852498n,
		title: "京都のモンスターといえば",
		content: "京都にはモンスターがいるという噂がある",
		image_url: "",
		answer: "まゆまろ",
		priority: 1,
		created_at: new Date(),
		updated_at: new Date(),
	},
];

export const findAllQuestions = () => {
	return questions;
};

export const findQuestionsByStoryID = (story_id: bigint) => {
	return questions.filter((question) => question.story_id === story_id);
};
