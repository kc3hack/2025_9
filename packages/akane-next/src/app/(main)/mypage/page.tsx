import { Tabs, VStack } from "@chakra-ui/react";

export default function MyPage() {
    //if ("user") {
        return (
            <VStack>
                <Tabs.Root>
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">進行中</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">解読済み</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">オリジナル</Tabs.Trigger>
                    </Tabs.List>
                </Tabs.Root>
            </VStack>
        );
    //}
}