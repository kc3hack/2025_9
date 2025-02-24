import { StoryProgression } from "@prisma/client";

export function StoryProgressions_mockStoryProgression(story_id: bigint, user_account_id: bigint): StoryProgression[] {
    return [...Array(50)].map((_, i) => ({
        story_id: story_id,
        id: BigInt(i),
        user_account_id: user_account_id,
        status: "in_progress",
        current_question_id: BigInt(i),
        created_at: new Date(),
        updated_at: new Date(),
    }))
};