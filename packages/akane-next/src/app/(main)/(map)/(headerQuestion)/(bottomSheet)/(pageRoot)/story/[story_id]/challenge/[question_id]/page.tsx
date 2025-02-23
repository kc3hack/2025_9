import { Text } from "@chakra-ui/react";
import { getQuestionHints, questionsGenerate } from "../../../../question_mock";
import QuestionChallengeClientPage from "./page_client";
import { redirect } from "next/navigation";
import { StoryProgressions_mockStoryProgression } from "../../../../story_progression_mock";
import { getStories } from "../../../../story_mock";

export default async function NazoChallengePage({
    params,
}: {
    params: Promise<{
        story_id: string;
        question_id: string;
    }>;
}) {
    const { story_id, question_id } = await params;
    const stories = getStories();
    const story = stories.find((s) => s.id === BigInt(story_id));
    if (!story) {
        return <Text>ストーリーが見つかりませんでした</Text>;
    }
    const questions = questionsGenerate(Number(story_id));
    const question = questions.find((q) => q.id === BigInt(question_id));
    if (!question) {
        return <Text>問題が見つかりませんでした</Text>;
    }
    const nextQuestionId = questions.find((q) => q.priority === question.priority + 1)?.id ?? null;

    const questionHints = getQuestionHints(BigInt(question_id));

    const story_progressions = StoryProgressions_mockStoryProgression(BigInt(story_id), BigInt(1));
    const story_progression = story_progressions.find((sp) => sp.story_id === BigInt(story_id));
    if (!story_progression) {
        return <Text>ストーリープログレッションが見つかりませんでした</Text>;
    }

    if (story_progression.current_question_id !== question.id) {
        redirect(`/story/${story_id}/challenge/${story_progression.current_question_id}`);
    }

    // /story/1/challenge/1
    // クイズに正解すると /story/1/challenge/2 (同じこのファイルに戻って来る)


    return (
        <QuestionChallengeClientPage
            question={question}
            questionHints={questionHints}
            nextQuestionId={nextQuestionId}
            story_progression={story_progression}
        />
    );
}