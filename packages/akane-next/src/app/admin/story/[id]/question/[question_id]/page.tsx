import AdminHeader from "@/components/admin/header";
import { QuestionService } from "@/services/question";
import { notFound } from "next/navigation";

export default async function AdminStoryQuestionInfoPage({
	params,
}: { params: Promise<{ id: bigint; question_id: bigint }> }) {
	const storyID = (await params).id;
	const questionID = (await params).question_id;
	const question = await QuestionService.findQuestionByID(questionID);
	if (!question) notFound();

	return (
		<>
			<AdminHeader
				title="ストーリーの問題詳細"
				parents={[
					{ name: "管理画面", href: "/admin" },
					{ name: "ストーリー管理", href: "/admin/story" },
					{ name: storyID.toString(), href: `/admin/story/${storyID}` },
					{ name: "問題管理", href: `/admin/story/${storyID}/question` },
					{ name: questionID.toString() },
				]}
			/>

			<div className="card mb-5">
				<div className="card-header">問題</div>
				<table className="card-body table">
					<tbody>
						<tr>
							<th>問題ID</th>
							<td>{question?.id.toString()}</td>
						</tr>
						<tr>
							<th>タイトル</th>
							<td>{question?.title}</td>
						</tr>
						<tr>
							<th>内容</th>
							<td>{question?.content}</td>
						</tr>
						<tr>
							<th>回答</th>
							<td>{question?.answer}</td>
						</tr>
						<tr>
							<th>優先度</th>
							<td>{question?.priority}</td>
						</tr>
						<tr>
							<th>作成日時</th>
							<td>{question?.created_at.toString()}</td>
						</tr>
						<tr>
							<th>更新日時</th>
							<td>{question?.updated_at.toString()}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
}
