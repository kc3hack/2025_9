import AdminHeader from "@/components/admin/header";
import { StoryService } from "@/services/story";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminStoryPage() {
	const data = [
		...(
			await StoryService.findStoriesWithPager({
				page: 1,
			})
		).data,
	];

	return (
		<div>
			<AdminHeader
				title="ストーリー管理"
				parents={[
					{ name: "管理画面", href: "/admin" },
					{ name: "ストーリー管理" },
				]}
			/>

			<div className="my-3">
				<Link href={"/admin/story/new"} className="text-white">
					<button type="button" className="btn btn-primary">
						新規作成
					</button>
				</Link>
			</div>

			<table className="table">
				<thead>
					<tr>
						<th scope="col">ID</th>
						<th scope="col">Type</th>
						<th scope="col">Title</th>
						<th scope="col">Status</th>
						<th scope="col">Difficulty</th>
						<th scope="col">Info</th>
					</tr>
				</thead>
				<tbody>
					{data.map((story) => (
						<tr key={story.id}>
							<th scope="row">{story.id}</th>
							<td>{story.type === "long" ? "長編" : "短編"}</td>
							<td>{story.title}</td>
							<td>{story.status}</td>
							<td>{story.difficulty}</td>
							<td>
								<button type="button" className="btn btn-link">
									<Link href={`/admin/story/${story.id}`}>詳細を見る</Link>
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
