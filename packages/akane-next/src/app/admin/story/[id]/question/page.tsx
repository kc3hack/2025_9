import AdminHeader from "@/components/admin/header";
import AdminStoryQuestionEditForm from "@/components/admin/story/question/form";
import { QuestionService } from "@/services/question";
import { redirect } from "next/navigation";
import { getQuestionFromFormData } from "../../util";

export default async function AdminStoryQuestionPage({
	params,
	searchParams,
}: {
	params: Promise<{ id: bigint }>;
	searchParams: { question_id?: bigint };
}) {
	const id = (await params).id;
	const questionID = (await searchParams).question_id;
	const question =
		questionID !== undefined
			? ((await QuestionService.findQuestionByID(questionID)) ?? undefined)
			: undefined;

	const onSubmit = async (form: FormData) => {
		"use server";
		const rawQuestion = getQuestionFromFormData(form);
		const question = await QuestionService.createQuestion(id, rawQuestion);
		if ("error" in question) {
			console.error(question.error);
			return;
		}

		redirect(`/admin/story/${id}/question/${question.id}`);
	};

	return (
		<>
			<AdminHeader
				title="ストーリーの問を作成"
				parents={[
					{ name: "管理画面", href: "/admin" },
					{ name: "ストーリー管理", href: "/admin/story" },
					{ name: id.toString(), href: `/admin/story/${id.toString()}` },
					{ name: "問題管理" },
				]}
			/>

			<AdminStoryQuestionEditForm
				onSubmitted={onSubmit}
				data={{
					storyID: id,
					question: question,
				}}
			/>
		</>
	);
}
