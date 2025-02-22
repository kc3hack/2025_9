import AdminHeader from "@/components/admin/header";
import AdminStoryEditForm from "@/components/admin/story/form";
import { QuestionService } from "@/services/question";
import { StoryService } from "@/services/story";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getStoryFromFormData } from "../util";

export default async function StoryInfoPage({
	params,
	searchParams,
}: {
	params: Promise<{ id: bigint }>;
	searchParams: Promise<{ [edit: string]: string | string[] | undefined }>;
}) {
	const id = (await params).id;

	const data = await StoryService.findStoryByID(id);
	if (!data) {
		return notFound();
	}

	const onSubmit = async (form: FormData) => {
		"use server";
		const data = getStoryFromFormData(form);
		const result = await StoryService.updateStory(id, data);

		redirect(`/admin/story/${result.id}`);
	};

	const isEdit = (await searchParams).edit;
	if (isEdit) {
		return (
			<>
				<AdminHeader
					title="ストーリー編集"
					parents={[
						{ name: "管理画面", href: "/admin" },
						{ name: "ストーリー管理", href: "/admin/story" },
						{ name: id.toString() },
					]}
				/>

				<AdminStoryEditForm onSubmitted={onSubmit} story={data} />
			</>
		);
	}

	const questions = await QuestionService.findQuestionsByStoryID(id);

	return (
		<>
			<AdminHeader
				title="ストーリー詳細"
				parents={[
					{ name: "管理画面", href: "/admin" },
					{ name: "ストーリー管理", href: "/admin/story" },
					{ name: id.toString() },
				]}
			/>

			<div className="card mb-5">
				<div className="card-header d-flex justify-content-between align-items-center">
					ストーリー情報
					<Link
						href={`/admin/story/${id}?edit=true`}
						className="btn btn-sm btn-outline-dark"
					>
						編集
					</Link>
				</div>
				<table className="table table-striped mb-0">
					<tbody>
						<tr>
							<th>ID</th>
							<td>{data.id}</td>
						</tr>
						<tr>
							<th>タイトル</th>
							<td>{data.title}</td>
						</tr>
						<tr>
							<th>内容</th>
							<td>{data.content}</td>
						</tr>
						<tr>
							<th>画像URL</th>
							<td>{data.image_url}</td>
						</tr>
						<tr>
							<th>タイプ</th>
							<td>{data.type}</td>
						</tr>
						<tr>
							<th>ステータス</th>
							<td>{data.status}</td>
						</tr>
						<tr>
							<th>難易度</th>
							<td>{data.difficulty}</td>
						</tr>
						<tr>
							<th>推定時間</th>
							<td>{data.estimated_time}</td>
						</tr>
						<tr>
							<th>エリア</th>
							<td>{data.area}</td>
						</tr>
						<tr>
							<th>緯度</th>
							<td>{data.latitude}</td>
						</tr>
						<tr>
							<th>経度</th>
							<td>{data.longitude}</td>
						</tr>
						<tr>
							<th>半径</th>
							<td>{data.radius}</td>
						</tr>
						<tr>
							<th>ピンクラス</th>
							<td>{data.pin_class}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="card mb-5">
				<div className="card-header d-flex justify-content-between align-items-center">
					問題情報
					<Link
						className="btn btn-primary"
						href={`/admin/story/${id}/question?new=true`}
					>
						追加
					</Link>
				</div>
				<table className="table table-striped mb-0">
					<thead>
						<tr>
							<th>ID</th>
							<th>タイトル</th>
							<th>内容</th>
							<th>回答</th>
							<th>優先度</th>
							<th>-</th>
						</tr>
					</thead>
					<tbody>
						{questions.map((question) => (
							<tr key={question.id}>
								<td>{question.id}</td>
								<td>{question.title}</td>
								<td>{question.content}</td>
								<td>{question.answer}</td>
								<td>{question.priority}</td>
								<td>
									<Link href={`/admin/story/${id}/question/${question.id}`}>
										詳細を見る
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
