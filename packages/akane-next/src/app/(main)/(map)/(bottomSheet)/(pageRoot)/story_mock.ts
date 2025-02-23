import { Story } from "@prisma/client";

export const stories: Story[] = [...Array(50)].map((_, i) => ({
    id: BigInt(i),
    user_account_id: BigInt(i + 1111),
    title: `謎解き${i}`,
    content: `謎解き${i}の内容`,
    image_url: "/images/placeholder.png",
    type: i % 2 === 0 ? "short" : "normal", // short | normal で想定
    status: "published",
    difficulty: 0,
    estimated_time: "10min",
    area: "東京都",
    radius: 100,
    longitude: 139.767052 + i * 0.0001,
    latitude: 35.681167 + i * 0.0001,
    pin_class: "normal",
    created_at: new Date(),
    updated_at: new Date(),
}));