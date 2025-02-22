import { Text } from "@chakra-ui/react";

export default async function NazoDetail({
    params
}: {
    params: {
        nazo_id: Promise<string>;
    };
}) {
    const { nazo_id } = await params;
    return (
        <div>
            <Text textStyle="2xl">謎解き詳細</Text>
            <Text>{nazo_id}</Text>
        </div>
    );
}