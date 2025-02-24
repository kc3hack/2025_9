import { ShortUUID } from "@/helper/test/uuid";
import type { Story } from "@prisma/client";

export const stories: Story[] = [...Array(50)].map((_, i) => ({
	id: BigInt(i),
	user_account_id: BigInt(i + 1111),
	title: `謎解き${i}`,
	content: `謎解き${i}の内容あああああああああああああ\niああああああああああああ`,
	image_url: "/next.svg",
	type: i % 2 === 0 ? "short" : "normal", // short | normal で想定
	status: "published",
	difficulty: 0,
	estimated_time: "10min",
	area: "東京都",
	radius: 200,
	longitude: 139.767052 + i * 0.0001,
	latitude: 35.681167 + i * 0.0001,
	pin_class: "normal",
	created_at: new Date(),
	updated_at: new Date(),
}));

const locations: Story[] = [
	{
		id: 16285261379101901648n,
		user_account_id: ShortUUID.next(),
		title: "KC3Hack2025に眠る財宝",
		content:
			"KC3Hack2025が開催される会場には、財宝が隠されているという噂がある。財宝を見つけるためには、会場内に隠された謎を解く必要がある。",
		image_url:
			"https://media.connpass.com/thumbs/07/16/07164855ab415348821619e38115bd19.png",
		area: "KRP4号館",
		type: "normal",
		status: "published",
		latitude: 34.99505914444529,
		longitude: 135.73863477691611,
		radius: 200,
		estimated_time: "10min",
		difficulty: 2,
		pin_class: "normal",
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		id: 16285261379101852498n,
		user_account_id: ShortUUID.next(),
		title: "京都駅モンスターの足跡",
		content:
			"京都駅周辺には、巨大なモンスターが出現したという目撃情報がある。モンスターの足跡をたどり、その正体を突き止めよう。",
		image_url:
			"https://images.unsplash.com/photo-1732827192471-5a33001ae4d7?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		area: "京都駅",
		type: "short",
		status: "published",
		latitude: 34.985849,
		longitude: 135.758767,
		radius: 200,
		estimated_time: "10min",
		difficulty: 1,
		pin_class: "normal",
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		id: 16285261379101852500n,
		user_account_id: ShortUUID.next(),
		title: "京都タワーと君と僕",
		content:
			"京都タワーの周辺には、君と僕の思い出が詰まっている。君と僕の思い出をたどり、その先に待つものを探し出そう。",
		image_url:
			"https://images.unsplash.com/photo-1710759086743-6d5875f39485?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		area: "京都タワー",
		type: "short",
		status: "published",
		latitude: 34.9875,
		longitude: 135.759,
		radius: 200,
		estimated_time: "10min",
		difficulty: 0,
		pin_class: "normal",
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		id: 16285261379101852502n,
		user_account_id: ShortUUID.next(),
		title: "家電量販店の地下には巨大食料庫があるって本当？",
		content:
			"京都駅近くには大きな家電量販店がいくつかある。どこかの家電量販店の地下には、巨大な食料庫があるという噂がある。その噂を確かめたい。",
		image_url:
			"https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		area: "京都駅",
		type: "short",
		status: "published",
		latitude: 34.985849,
		longitude: 135.758767,
		radius: 200,
		estimated_time: "10min",
		difficulty: 1,
		pin_class: "normal",
		created_at: new Date(),
		updated_at: new Date(),
	},
];
export const getStories = () => locations;
