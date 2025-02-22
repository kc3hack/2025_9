import { createUUID } from "@/helper/uuid";
import type { Question } from "@/model/question";
import { prisma } from "@/prisma/client";
import type { Question as PrismaQuestion } from "@prisma/client";
import type { PrismaClient } from "@prisma/client";

class Service {
	db: PrismaClient;

	constructor(db: PrismaClient) {
		this.db = db;
	}

	private toQuestionDTO(data: PrismaQuestion): Question {
		return {
			id: data.id,
			storyID: data.story_id,
			title: data.title,
			content: data.content,
			answer: data.answer,
			priority: data.priority,
		};
	}

	async findQuestionByID(id: bigint): Promise<PrismaQuestion | null> {
		const data = await this.db.question.findUnique({
			where: {
				id: id,
			},
		});
		if (!data) return null;

		return data;
	}

	async findQuestionsByStoryID(storyID: bigint): Promise<Question[]> {
		const data = await this.db.question.findMany({
			where: {
				story_id: storyID,
			},
		});
		return data.map((question) => this.toQuestionDTO(question));
	}

	async createQuestion(
		storyID: bigint,
		question: Partial<Question>,
	): Promise<Question | { error: string }> {
		if (!question.title) return { error: "Title is required" };
		if (!question.content) return { error: "Content is required" };
		if (!question.answer) return { error: "Answer is required" };

		const id = await createUUID();

		const data = await this.db.question.create({
			data: {
				id: id,
				story_id: storyID,
				title: question.title,
				content: question.content,
				answer: question.answer,
				priority: question.priority ?? 0,
			},
		});

		return this.toQuestionDTO(data);
	}

	async updateQuestion(question: Partial<Question>): Promise<Question> {
		const data = await this.db.question.update({
			where: {
				id: question.id,
			},
			data: {
				title: question.title,
				content: question.content,
				answer: question.answer,
				priority: question.priority,
			},
		});
		return this.toQuestionDTO(data);
	}
}

export const QuestionService = new Service(prisma);
