import { describe, it, expect, beforeEach, vi } from "vitest";
import { QuestionService } from "./question";
import type { PrismaClient } from "@prisma/client";

describe("QuestionService", () => {
	let fakeDb: PrismaClient;

	beforeEach(() => {
		fakeDb = {
			question: {
				findUnique: vi.fn(),
				create: vi.fn(),
			},
		} as unknown as PrismaClient;
		QuestionService.db = fakeDb;
	});

	describe("findQuestionByID", () => {
		it("ID に対応する Question がないときは null を返す", async () => {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(fakeDb.question.findUnique as any).mockResolvedValue(null);
			const result = await QuestionService.findQuestionByID(1n);
			expect(result).toBeNull();
		});

		it("Question が見つかった時は DTO にしてから返す", async () => {
			const prismaQuestion = {
				id: 1n,
				story_id: 123n,
				title: "Test title",
				content: "Test content",
				answer: "Test answer",
				priority: 10,
			};
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(fakeDb.question.findUnique as any).mockResolvedValue(prismaQuestion);
			const result = await QuestionService.findQuestionByID(1n);
			expect(result).toEqual({
				id: prismaQuestion.id,
				storyID: prismaQuestion.story_id,
				title: prismaQuestion.title,
				content: prismaQuestion.content,
				answer: prismaQuestion.answer,
				priority: prismaQuestion.priority,
			});
		});
	});

	describe("createQuestion", () => {
		it("title がない時はエラーを返す", async () => {
			const result = await QuestionService.createQuestion({
				content: "Some content",
			});
			expect(result).toEqual({ error: "Title is required" });
		});

		it("content がない時はエラーを返す", async () => {
			const result = await QuestionService.createQuestion({
				title: "Some title",
			});
			expect(result).toEqual({ error: "Content is required" });
		});

		it("作成後は Question の DTO に変換されて返される", async () => {
			const prismaQuestion = {
				id: 1n,
				story_id: 1n,
				title: "Valid title",
				content: "Valid content",
				answer: "",
				priority: 0,
			};
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(fakeDb.question.create as any).mockResolvedValue(prismaQuestion);
			const result = await QuestionService.createQuestion({
				title: "Valid title",
				content: "Valid content",
			});
			expect(result).toEqual({
				id: prismaQuestion.id,
				storyID: prismaQuestion.story_id,
				title: prismaQuestion.title,
				content: prismaQuestion.content,
				answer: prismaQuestion.answer,
				priority: prismaQuestion.priority,
			});
		});
	});
});
