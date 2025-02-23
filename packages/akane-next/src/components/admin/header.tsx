import Link from "next/link";

type Props = {
	title: string;
	parents: { name: string; href?: string }[];
};

export default function AdminHeader({ title, parents }: Props) {
	return (
		<header className="mt-4">
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					{parents.map((parent, i) => (
						<li
							key={parent.href}
							className={`breadcrumb-item ${i === parents.length - 1 ? "active" : ""}`}
							aria-current={i === parents.length - 1 ? "page" : undefined}
						>
							{!parent.href || i === parents.length - 1 ? (
								<span>{parent.name}</span>
							) : (
								<Link href={parent.href}>{parent.name}</Link>
							)}
						</li>
					))}
				</ol>
			</nav>
			<h1 className="fw-bold my-4">{title}</h1>
		</header>
	);
}
