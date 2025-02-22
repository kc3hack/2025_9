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

	async findQuestionByID(id: bigint): Promise<Question | null> {
		const data = await this.db.question.findUnique({
			where: {
				id: id,
			},
		});
		if (!data) return null;

		return this.toQuestionDTO(data);
	}

	async createQuestion({
		title,
		content,
	}: Partial<Question>): Promise<Question | { error: string }> {
		if (!title) return { error: "Title is required" };
		if (!content) return { error: "Content is required" };

		const data = await this.db.question.create({
			data: {
				id: 1n,
				story_id: 1n,
				title: title,
				content: content,
				answer: "",
				priority: 0,
			},
		});

		return this.toQuestionDTO(data);
	}
}

export const QuestionService = new Service(prisma);
