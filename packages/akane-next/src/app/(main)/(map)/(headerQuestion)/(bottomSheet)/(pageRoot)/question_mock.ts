import { Hint, Question, QuestionHint } from "@prisma/client";

export function questionsGenerate(story_id = 1): Question[] {
    return [...Array(50)].map((_, i) => ({
        id: BigInt(i),
        story_id: BigInt(story_id),
        title: `問題${i}`,
        content: `問題${i}の内容`,
        image_url: "/next.svg",
        answer: `答え${i}`,
        priority: i,
        created_at: new Date(),
        updated_at: new Date(),
    }));
};

export function getQuestionHints(question_id: bigint): (QuestionHint & Hint)[] {
    return [...Array(3)].map((_, i) => ({
        id: BigInt(i),
        question_id,
        hint_id: BigInt(i),
        priority: i,
        type: "hint",
        title: `ヒント${i}`,
        content: `これはアレです${i}`,
        image_url: "/next.svg",
        created_at: new Date(),
        updated_at: new Date(),
    }));
}