import { Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function TopPage() {
    return (
        <div>
            <Text textStyle="2xl">近くの謎解き</Text>
            <VStack>
                {[...Array(50)].map((_, i) => (
                    <Link
                        key={i}
                        href={`/nazo/${i}`}
                    >
                        <Text color={"blue.500"}>
                            Item {i}
                        </Text>
                    </Link>
                ))}
            </VStack>
        </div>
    );
}