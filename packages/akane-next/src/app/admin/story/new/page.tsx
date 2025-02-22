import AdminHeader from "@/components/admin/header";
import AdminStoryEditForm from "@/components/admin/story/form";
import { StoryService } from "@/services/story";
import { redirect } from "next/navigation";
import type React from "react";
import { getStoryFromFormData } from "../util";

export default function AdminStoryNewPage() {
	const onSubmit = async (form: FormData) => {
		"use server";
		const data = getStoryFromFormData(form);
		try {
			const result = await StoryService.createStory(data);
			console.log(result);
			redirect(`/admin/story/${result.id}`);
		} catch (err) {
			console.error(err);
			redirect("/admin/story/new");
		}
	};

	return (
		<div>
			<AdminHeader
				title="ストーリー新規作成"
				parents={[
					{ name: "管理画面", href: "/admin" },
					{ name: "ストーリー管理", href: "/admin/story" },
					{ name: "新規作成" },
				]}
			/>

			<div className="container">
				<AdminStoryEditForm onSubmitted={onSubmit} />
			</div>
		</div>
	);
}
