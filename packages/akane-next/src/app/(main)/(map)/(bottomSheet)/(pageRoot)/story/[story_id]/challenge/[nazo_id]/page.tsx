import { Text } from "@chakra-ui/react";

export default async function NazoChallengePage({
    params,
}: {
    params: {
        story_id: Promise<string>;
        nazo_id: Promise<string>;
    };
}) {
    const { story_id, nazo_id } = await params;
    // /story/1/challenge/1
    // クイズに正解すると /story/1/challenge/2 (同じこのファイルに戻って来る)
    return (
        <div>
            <Text textStyle="2xl">謎解き詳細</Text>
            <Text>{story_id}</Text>
            <Text>{nazo_id}</Text>
        </div>
    );
}