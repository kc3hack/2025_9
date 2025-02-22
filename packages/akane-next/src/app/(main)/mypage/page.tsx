import { Tabs, VStack } from "@chakra-ui/react";

export default function MyPage() {
    //if ("user") {
        return (
            <VStack>
                <Tabs.Root defaultValue={"tab1"}>
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">進行中</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">解読済み</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">オリジナル</Tabs.Trigger>
                        <Tabs.Indicator rounded={6} />
                    </Tabs.List>
                    <Tabs.ContentGroup>
                        <Tabs.Content value="tab1">進行中の問題</Tabs.Content>
                        <Tabs.Content value="tab2">解読済みの問題</Tabs.Content>
                        <Tabs.Content value="tab3">オリジナル問題</Tabs.Content>
                    </Tabs.ContentGroup>
                </Tabs.Root>
            </VStack>
        );
    //}
}