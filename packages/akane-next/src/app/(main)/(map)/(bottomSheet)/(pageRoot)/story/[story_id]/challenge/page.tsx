import { Text } from "@chakra-ui/react";

export default async function NotFound({
    params,
}: {
    params: Promise<{
        story_id: string;
    }>;
}) {
    const { story_id } = await params;
    return (
        <div>
            <Text textStyle="2xl">404 Not Found</Text>
            {story_id}
        </div>
    );
}