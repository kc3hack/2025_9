import { Text } from "@chakra-ui/react";

export default async function NazoDetail({
    params
}: {
    params: Promise<{
        story_id: string;
    }>;
}) {
    const { story_id } = await params;
    return (
        <div>
            <Text textStyle="2xl">謎解き詳細</Text>
            <Text>{story_id}</Text>
        </div>
    );
}