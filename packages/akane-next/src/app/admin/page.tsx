import Link from "next/link";

export default function AdminIndexPage() {
	return (
		<div className=" mt-3">
			<section>
				<h2 className="fw-bold fs-4">ストーリー関連</h2>
				<ul className="list-group">
					<li className="list-group-item">
						<Link href="/admin/story">ストーリー一覧</Link>
					</li>
				</ul>
			</section>
		</div>
	);
}
